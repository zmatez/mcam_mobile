export class ResidualUser {
    public readonly id: number;
    public readonly nick: string;
    public color: string;
    public readonly joinDate: Date;

    constructor(id: number, nick: string, color: string, joinDate: Date) {
        this.id = id;
        this.nick = nick;
        this.color = color;
        this.joinDate = joinDate;
    }

    public static fromServer(data: any): ResidualUser | null {
        if (data.hasOwnProperty("id") && data.hasOwnProperty("nick") && data.hasOwnProperty("color") && data.hasOwnProperty("join_date")) {
            return new ResidualUser(data['id'], data['nick'], data['color'], new Date(data['join_date']));
        }

        return null;
    }

    public getAvatar(): string | null {
        return null;
    }
}

export class User extends ResidualUser {
    public readonly email: string | null;
    public admin: boolean;
    public token?: string;
    public hash?: string;

    constructor(id: number, nick: string, email: string | null, color: string, admin: boolean, joinDate: Date, token?: string, hash?: string) {
        super(id, nick, color, joinDate);
        this.email = email;
        this.admin = admin;
        this.token = token;
        this.hash = hash;
    }

    public static fromServer(data: any): User | null {
        if (data.hasOwnProperty("id") && data.hasOwnProperty("nick") && data.hasOwnProperty("color") && data.hasOwnProperty("admin") && data.hasOwnProperty("join_date")) {
            return new User(data['id'], data['nick'], data['email'], data['color'], data['admin'], new Date(data['join_date']), data['token'], data['hash']);
        }

        return null;
    }

    public toJSON(): any {
        return {
            id: this.id,
            nick: this.nick,
            color: this.color,
            admin: this.admin,
            join_date: this.joinDate,
            hash: this.hash
        };
    }
}