import {ResidualUser, User} from "./user";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class CameraModel {
    public readonly id: number;
    public readonly name: string;
    public softwareVersion: string;

    constructor(id: number, name: string, softwareVersion: string) {
        this.id = id;
        this.name = name;
        this.softwareVersion = softwareVersion;
    }
}

export class CameraAccessor {
    public readonly id: number;
    public readonly user: ResidualUser;
    public admin: boolean;

    constructor(id: number, user: ResidualUser, admin: boolean) {
        this.id = id;
        this.user = user;
        this.admin = admin;
    }

    public static fromServer(data: any): CameraAccessor | null {
        if (!data.hasOwnProperty("id")) {
            return null;
        }
        if (!data.hasOwnProperty("user")) {
            return null;
        }
        if (!data.hasOwnProperty("admin")) {
            return null;
        }

        const user = ResidualUser.fromServer(data['user']);
        if (!user) {
            return null;
        }

        return new CameraAccessor(data['id'], user, data['admin']);
    }
}

export class Camera {
    public readonly id: number;
    public readonly sid: string;
    public readonly model: CameraModel;
    public owner: User;
    public name: string;
    public online: boolean;

    constructor(id: number, sid: string, model: CameraModel, owner: User, name: string, online: boolean) {
        this.id = id;
        this.sid = sid;
        this.model = model;
        this.owner = owner;
        this.name = name;
        this.online = online;
    }

    public static fromServer(data: any): Camera | null {
        if (data.hasOwnProperty('id') && data.hasOwnProperty('sid') && data.hasOwnProperty('model') && data.hasOwnProperty('owner') && data.hasOwnProperty('name')) {
            const user = User.fromServer(data['owner']);
            if (user)
                return new Camera(data['id'], data['sid'], new CameraModel(data['model']['id'], data['model']['name'], data['model']['software_version']), user, data['name'], data['online']);
        }
        return null;
    }

    public toJSON(): any {
        return {
            id: this.id,
            sid: this.sid,
            model: {
                id: this.model.id,
                name: this.model.name,
                software_version: this.model.softwareVersion
            },
            owner: this.owner.toJSON(),
            name: this.name
        }
    }

    public async getLocalScreenshot(): Promise<string | null> {
        const camerasString = await AsyncStorage.getItem('cameras')
        let cameras: {[sid: string]: {preview: string | null}} = {};
        if(camerasString) {
            cameras = JSON.parse(camerasString);
        }
        if(!cameras) {
            return null;
        }

        if(!(this.sid in cameras)) {
            cameras[this.sid] = {preview: null};
        }

        return cameras[this.sid].preview;
    }

    public async setLocalScreenshot(image: string) {
        const camerasString = await AsyncStorage.getItem('cameras')
        let cameras: {[sid: string]: {preview: string | null}} = {};
        if(camerasString) {
            cameras = JSON.parse(camerasString);
        }
        if(!cameras) {
            return
        }

        if(!(this.sid in cameras)) {
            cameras[this.sid] = {preview: null};
        }

        cameras[this.sid].preview = image;
        await AsyncStorage.setItem('cameras',JSON.stringify(cameras));
    }
}

export abstract class CameraInfo {
    public readonly status: "online" | "offline";
    public readonly lastLog: { type: "login" | "logout", date: Date } | null;
    public readonly accessors: CameraAccessor[];
    public readonly owner: ResidualUser;

    protected constructor(status: "online" | "offline", lastLog: { type: "login" | "logout"; date: Date } | null, accessors: CameraAccessor[], owner: ResidualUser) {
        this.status = status;
        this.lastLog = lastLog;
        this.accessors = accessors;
        this.owner = owner;
    }
}

export class CameraInfoOffline extends CameraInfo {
    constructor(lastLog: { type: "login" | "logout"; date: Date } | null, accessors: CameraAccessor[], owner: ResidualUser) {
        super("offline", lastLog, accessors, owner);
    }

    public static fromServer(data: any): CameraInfoOffline | null {
        if (!data.hasOwnProperty('accessors')) {
            return null;
        }
        if (!data.hasOwnProperty('owner')) {
            return null;
        }

        const accessors = [];
        for (let acc of data['accessors']) {
            const accessor = CameraAccessor.fromServer(acc);
            if (accessor) {
                accessors.push(accessor);
            }
        }

        let owner = ResidualUser.fromServer(data['owner']);
        if (!owner) {
            return null;
        }

        return new CameraInfoOffline(data['last_log'] ? {
                type: data['last_log']['type'],
                date: new Date(data['last_log']['date'])
            } : null,
            accessors,
            owner
        );
    };
}

export interface TempReading {
    date: Date;
    temperature: number;
}

export class CameraInfoOnline extends CameraInfo {
    public readonly watchers: number;
    public readonly format: string;
    public readonly temperature: number;
    public readonly lastPictures: string[];
    public readonly flash: boolean;
    public readonly ping: number;
    public readonly rssi?: number;

    constructor(watchers: number,
                format: string,
                lastLog: { type: "login" | "logout"; date: Date } | null,
                accessors: CameraAccessor[],
                owner: ResidualUser,
                temperature: number,
                lastImages: string[],
                flash: boolean,
                ping: number,
                rssi?: number
    ) {
        super("online", lastLog, accessors, owner);
        this.watchers = watchers;
        this.format = format;
        this.temperature = temperature;
        this.lastPictures = lastImages;
        this.flash = flash;
        this.ping = ping;
        this.rssi = rssi;
    }

    public static fromServer(data: any): CameraInfoOnline | null {
        if (!data.hasOwnProperty("watchers")) {
            return null;
        }
        if (!data.hasOwnProperty("format")) {
            return null;
        }
        if (!data.hasOwnProperty("temperature")) {
            return null;
        }
        if (!data.hasOwnProperty('accessors')) {
            return null;
        }
        if (!data.hasOwnProperty('flash')) {
            return null;
        }
        if (!data.hasOwnProperty('ping')) {
            return null;
        }
        if (!data.hasOwnProperty('owner')) {
            return null;
        }

        const accessors = [];
        for (let acc of data['accessors']) {
            const accessor = CameraAccessor.fromServer(acc);
            if (accessor) {
                accessors.push(accessor);
            }
        }

        let owner = ResidualUser.fromServer(data['owner']);
        if (!owner) {
            return null;
        }

        return new CameraInfoOnline(data['watchers'], data['format'], data['last_log'], accessors, owner, data['temperature'], data['last_pictures'], data['flash'], data['ping'], data['rssi']);
    };
}

export class CameraHistory {
    public readonly images: { name: string, image?: string }[];
    public readonly sdTotalSize;
    public readonly sdUsedSize;
    public readonly maxImages;

    constructor(data: string[], sdTotalSize: number, sdUsedSize: number, maxImages: number) {
        this.images = [];
        for (let img of data) {
            this.images.push({name: img, image: undefined});
        }

        this.sdTotalSize = sdTotalSize;
        this.sdUsedSize = sdUsedSize;
        this.maxImages = maxImages;
    }

    public static fromServer(json: any): CameraHistory | null {
        if (!json.hasOwnProperty("images")) {
            return null
        }
        if (!json.hasOwnProperty("sd_total_size")) {
            return null;
        }
        if (!json.hasOwnProperty("sd_used_size")) {
            return null;
        }
        if (!json.hasOwnProperty("max_images")) {
            return null;
        }

        return new CameraHistory(json['images'], json['sd_total_size'], json['sd_used_size'], json['max_images'])
    }

    setImage(name: string, image?: string): boolean {
        for (let img of this.images) {
            if (img.name === name) {
                img.image = image;
                return true;
            }
        }
        return false;
    }
}

export class CameraSettings {
    public readonly admin: boolean;
    public readonly softwareVersion: string;
    public readonly sdTotalSize: number;
    public readonly sdUsedSize: number;
    public readonly format: string;
    public readonly quality: number;
    public readonly brightness: number;
    public readonly contrast: number;
    public readonly saturation: number;
    public readonly sharpness: number;
    public readonly denoise: number;
    public readonly pictureBlink: boolean;
    public readonly timeZone: number;

    constructor(
        admin: boolean,
        softwareVersion: string,
        sdTotalSize: number,
        sdUsedSize: number,
        format: string,
        quality: number,
        brightness: number,
        contrast: number,
        saturation: number,
        sharpness: number,
        denoise: number,
        motionBlink: boolean,
        timeZone: number
    ) {
        this.admin = admin;
        this.softwareVersion = softwareVersion;
        this.sdTotalSize = sdTotalSize;
        this.sdUsedSize = sdUsedSize;
        this.format = format;
        this.quality = quality;
        this.brightness = brightness;
        this.contrast = contrast;
        this.saturation = saturation;
        this.sharpness = sharpness;
        this.denoise = denoise;
        this.pictureBlink = motionBlink;
        this.timeZone = timeZone;
    }

    public static fromServer(data: any): CameraSettings | null {
        if (!data.hasOwnProperty("admin")) {
            return null;
        }
        if (!data.hasOwnProperty("software_version")) {
            return null;
        }
        if (!data.hasOwnProperty("sd_total_size")) {
            return null;
        }
        if (!data.hasOwnProperty("sd_used_size")) {
            return null;
        }

        if (data['admin']) {
            if (!data.hasOwnProperty("format")) {
                return null;
            }
            if (!data.hasOwnProperty("quality")) {
                return null;
            }
            // if (!data.hasOwnProperty("brightness")) {
            //     return null;
            // }
            // if (!data.hasOwnProperty("contrast")) {
            //     return null;
            // }
            // if (!data.hasOwnProperty("saturation")) {
            //     return null;
            // }
            // if (!data.hasOwnProperty("sharpness")) {
            //     return null;
            // }
            // if (!data.hasOwnProperty("denoise")) {
            //     return null;
            // }
            if (!data.hasOwnProperty("picture_blink")) {
                return null;
            }
            if (!data.hasOwnProperty("time_zone")) {
                return null;
            }
        }

        return new CameraSettings(
            data['admin'],
            data['software_version'],
            data['sd_total_size'],
            data['sd_used_size'],
            data['format'],
            data['quality'],
            data['brightness'],
            data['contrast'],
            data['saturation'],
            data['sharpness'],
            data['denoise'],
            data['picture_blink'],
            data['time_zone']
        );
    }
}