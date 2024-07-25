import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";
import { User } from "../../data";
import { CustomError, LoginUserDTO, RegisterUserDTO } from "../../domain";

export class UserService {

    async findOneUser(id: number) {
        const user = await User.findOne({
            where: {
                id
            },
            relations: ["players"]
        });

        if (!user) throw CustomError.notFound("User not found");
        return user;
    }

    async loginUser(loginUserDTO: LoginUserDTO) {
        const { username, email, password } = loginUserDTO;

        const user = await User.findOne({
            where: [
                {email},
                {username}
            ]
        });
        if (!user) throw CustomError.unAuthorized("Invalid email or password");

        const isMatching = bcryptAdapter.compare(password, user.password);
        if (!isMatching) throw CustomError.unAuthorized("Invalid email or password");

        const token = await JwtAdapter.generateToken({ id: user.id })
        if (!token) throw CustomError.internalServer("Error while creating JWT token");

        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        }
    }

    async registerUser(registerUserDTO: RegisterUserDTO) {
        const { email, username } = registerUserDTO;

        const existUser = await User.findOne({
            where: [{email}, {username}]
        })
    
        if (existUser) {
            if (existUser.email === email) {
                throw CustomError.unAuthorized("Email already exists")
            }
            if (existUser.username === username) {
                throw CustomError.unAuthorized("Username already exists")
            }
        }

        const user = new User();
        user.email = email;
        user.username = username;
        user.password = bcryptAdapter.hash(registerUserDTO.password);
        
        try {
            return await user.save();
        } catch (error) {
            throw CustomError.internalServer("Something went wrong");
        }
    }
}