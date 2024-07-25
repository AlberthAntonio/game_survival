
export class RegisterUserDTO {
    private constructor(
        public readonly username: string,
        public readonly email: string,
        public readonly password: string,
    ){}

    static create( object: { [key : string]: any } ): [string?, RegisterUserDTO?] {
        const { username, email, password } = object;

        if (!username) return ["missing username"];
        if (!email) return ["missing email"];
        if (!password) return ["missing password"];
        if (password.length < 10) return ["password must be at least 10 characters"];

        return [undefined, new RegisterUserDTO(username, email, password)];
    }





}