import {User} from "./user";
import {Camera} from "./camera";

export type AccountLogin = { id: number, user_id: number, ip: string, date: Date };

export class AccountData {
    public readonly user: User;
    public readonly availableColors: { name: string, hex: string }[];
    public readonly cameras: Camera[];
    public readonly logins: AccountLogin[];

    constructor(user: User, availableColors: { name: string, hex: string }[], cameras: Camera[], logins: AccountLogin[]) {
        this.user = user;
        this.availableColors = availableColors;
        this.cameras = cameras;
        this.logins = logins;
    }

    public static fromServer(data: any): AccountData | null {
        if (!data.hasOwnProperty('user')) {
            return null;
        }
        if (!data.hasOwnProperty('available_colors')) {
            return null;
        }
        if (!data.hasOwnProperty('cameras')) {
            return null;
        }
        if (!data.hasOwnProperty('logins')) {
            return null;
        }
        const user = User.fromServer(data['user']);
        if (!user) {
            return null;
        }
        const cameras = [];
        for (let cam of data['cameras']) {
            const camera = Camera.fromServer(cam);
            if (camera) {
                cameras.push(camera);
            }
        }

        return new AccountData(user, data['available_colors'], cameras, data['logins']);
    }
}