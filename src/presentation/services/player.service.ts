import { Player } from "../../data";
import { CreatePlayerDTO } from "../../domain";
import { CustomError } from "../../domain/errors/custom.errors";
import { UserService } from "./user.service";

export class PlayerService {
    constructor(
        private readonly userService: UserService,
    ) {}

    async createPlayer(createPlayerDTO: CreatePlayerDTO, userId: number) {
        //buscar al ususario y verififa que exista
        const userPromise = this.userService.findOneUser(userId);
        
        //buscar el nombre del jugador y verifica que no exista
        const playerPromise = this.findOnePlayerByName(createPlayerDTO.name);
        
        const [ userData, _] = await Promise.all([userPromise, playerPromise]);
        
        //crear el jugador y retornarlo
        const player = new Player();
        player.user = userData;
        player.name = createPlayerDTO.name.toLocaleLowerCase().trim();

        try {
            return await player.save();
        } catch (error) {
            throw CustomError.internalServer("Something went wrong");
        }
    }

    async findOnePlayer(id: number) {
        const player = await Player.findOne({
            where: {
                id: id,
            },
            relations: ["user", "clan_members"],
            select: {
                user: {
                    id: true,
                    username: true,
                    email: true,
                }
            },
        })

        if (!player) throw CustomError.notFound("Player not found");

        return player;
    }

    async findOnePlayerByName(name: string) {
        const player = await Player.findOne({
            where: {
                name: name,
            }
        });

        if (player) throw CustomError.notFound("This name already exists");
        
        return player;
    }
}