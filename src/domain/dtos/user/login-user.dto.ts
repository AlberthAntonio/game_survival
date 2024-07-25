
export class LoginUserDTO {
    private constructor(
        public readonly username: string | undefined,
        public readonly email: string | undefined,
        public readonly password: string
    ){}

    static create( object: { [key : string]: any } ): [string?, LoginUserDTO?] {
        const { username, email, password } = object;

        if (!username && !email ) return ["missing username or email"];
        if (!password) return ["missing password"];

        return [undefined, new LoginUserDTO(username, email, password)];
    }
}