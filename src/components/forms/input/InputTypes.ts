export class InputType {
    public type: string;
    public acceptChar: (char: string) => boolean;
    public isValid: (text: string) => string | true;

    constructor(type: string, acceptChar: (char: string) => boolean, isValid: (text: string) => string | true) {
        this.type = type;
        this.acceptChar = acceptChar;
        this.isValid = isValid;
    }
}

export const TYPES = {
    nick: new InputType("text", (char) => {
        const allowed = "abcdefghijklmnopqrstuwvxyz1234567890_";
        return allowed.includes(char.toLowerCase());
    }, (text) => {
        if (text.length < 3) {
            return "Nazwa powinna składać się z co najmniej 3 znaków."
        }
        if (text.length > 50) {
            return "Nazwa powinna składać się maksymalnie z 50 znaków."
        }

        return true;
    }),
    sid: new InputType("text", (char) => {
        const allowed = "abcdefghijklmnopqrstuwvxyz1234567890";
        return allowed.includes(char.toLowerCase());
    }, (text) => {
        if (text.length !== 16) {
            return "SID musi składać się z 16 znaków."
        }

        return true;
    }),
    hash: new InputType("text", (char) => {
        const allowed = "abcdefghijklmnopqrstuvwxyz1234567890";
        return allowed.includes(char.toLowerCase());
    }, (text) => {
        if (text.length !== 6) {
            return "Hash musi składać się z 6 znaków."
        }

        return true;
    }),
    email: new InputType("email", (char) => {
        return true;
    }, (text) => {
        if (!text.match(new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"))) {
            return "Email jest niepoprawny"
        }
        if (text.length > 255) {
            return "Email powienien składać się maksymalnie z 255 znaków";
        }

        return true;
    }),
    password: new InputType("password", (char) => {
        return true;
    }, (text) => {
        if (text.length <= 8) {
            return "Hasło powinno składać się z co najmniej 8 znaków."
        }
        if (text.length > 64) {
            return "Hasło powinno składać się maksymalnie z 64 znaków."
        }

        return true;
    })
}