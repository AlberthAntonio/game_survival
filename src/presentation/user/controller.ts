import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CustomError, LoginUserDTO, RegisterUserDTO } from "../../domain";

export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ message: error.message })
        }
    
        console.log(error)
        return res.status(500).json({ message: 'Something went very wrong! 🧨' })
    }

    findOneUser = async (req : Request, res : Response) => {
        const { id } = req.params;

        this.userService.findOneUser(+id)
            .then(user => res.status(200).json(user))
            .catch(error => this.handleError(error, res));
    }

    loginUser = async (req : Request, res : Response) => {
        const [error, loginUserDTO] = LoginUserDTO.create(req.body);
        if (error) return res.status(422).json({message: error});

        this.userService.loginUser(loginUserDTO!)
            .then(user => res.status(200).json(user))
            .catch(error => this.handleError(error, res));
    }

    registerUser = async (req: Request, res: Response) => {
        const [error, registerUserDTO] = RegisterUserDTO.create(req.body);
        if (error) return res.status(422).json({message: error});

        this.userService.registerUser(registerUserDTO!)
            .then(user => res.status(200).json(user))
            .catch(error => this.handleError(error, res));
    }
}