export function getAverageColor(url: string, callback: (hex: string | null) => void) {
    let img = new Image();
    img.src = url;
    img.crossOrigin = "use-credentials";
    img.onload = () => {
        let blockSize = 5, // only visit every 5 pixels
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = {r: 0, g: 0, b: 0},
            count = 0;

        if (!context) {
            callback(null);
            return
        }

        height = canvas.height = img.naturalHeight || img.offsetHeight || img.height;
        width = canvas.width = img.naturalWidth || img.offsetWidth || img.width;


        context.drawImage(img, 0, 0, Math.max(1, Math.floor(width)), Math.max(1, Math.floor(height)));

        try {
            data = context.getImageData(0, 0, width, height);
        } catch (e) {
            console.log(e)
            callback(null);
            return;
        }

        length = data.data.length;

        while ((i += blockSize * 4) < length) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i + 1];
            rgb.b += data.data[i + 2];
        }

        // ~~ used to floor values
        rgb.r = ~~(rgb.r / count);
        rgb.g = ~~(rgb.g / count);
        rgb.b = ~~(rgb.b / count);

        callback(((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1));
    }
}

export function picNameToDate(name: string): Date | null {
    if (name.length !== 14) {
        return null;
    }

    let year = name.slice(0, 4);
    let month = name.slice(4, 6);
    let day = name.slice(6, 8);
    let hour = name.slice(8, 10);
    let min = name.slice(10, 12);
    let sec = name.slice(12, 14);

    return new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(min), parseInt(sec)));
}

export function humanFileSize(bytes: number, spacing = true, si = false, dp = 1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


    return bytes.toFixed(dp) + (spacing ? ' ' : '') + units[u];
}

export function scaleBetween(unscaledNum: number, minAllowed: number, maxAllowed: number, min: number, max: number): number {
    return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
}

export function getDateData(date: Date): { season: "spring" | "summer" | "autumn" | "winter", timeOfDay: "day" | "night" } {
    let season: "spring" | "summer" | "autumn" | "winter";
    if (date.getMonth() >= 3 && date.getMonth() < 6) {
        season = "spring";
    } else if (date.getMonth() >= 6 && date.getMonth() < 9) {
        season = "summer";
    } else if (date.getMonth() >= 9 && date.getMonth() < 12) {
        season = "autumn";
    } else {
        season = "winter";
    }
    let timeOfDay: "day" | "night";
    if (season === "spring") {
        timeOfDay = (date.getHours() <= 18 && date.getHours()) > 6 ? "day" : "night";
    } else if (season === "summer") {
        timeOfDay = (date.getHours() <= 20 && date.getHours()) > 5 ? "day" : "night";
    } else if (season === "autumn") {
        timeOfDay = (date.getHours() <= 17 && date.getHours()) > 8 ? "day" : "night";
    } else {
        timeOfDay = (date.getHours() <= 15 && date.getHours()) > 6 ? "day" : "night";
    }

    return {season, timeOfDay}
}

/**
 * use this to make a Base64 encoded string URL friendly,
 * i.e. '+' and '/' are replaced with '-' and '_' also any trailing '='
 * characters are removed
 *
 * @param {String} str the encoded string
 * @returns {String} the URL friendly encoded String
 */
export function Base64EncodeUrl(str: string) {
    return atob(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
}

/**
 * Use this to recreate a Base64 encoded string that was made URL friendly
 * using Base64EncodeurlFriendly.
 * '-' and '_' are replaced with '+' and '/' and also it is padded with '+'
 *
 * @param {String} str the encoded string
 * @returns {String} the URL friendly encoded String
 */
export function Base64DecodeUrl(str: string) {
    str = (str + '===').slice(0, str.length + (str.length % 4));
    return btoa(str.replace(/-/g, '+').replace(/_/g, '/'));
}