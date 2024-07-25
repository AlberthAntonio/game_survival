// ConstructionService
import { Construction } from "../../data";
import { CustomError } from "../../domain";
import { CreateConstructionDTO } from "../../domain/dtos/construction/construction.dto";
import { PlayerService } from "./player.service";

export class ConstructionService {

    constructor(
        private readonly playerService: PlayerService,
    ) {}

    async createConstruction(playerId: number, createConstructionDTO: CreateConstructionDTO) {
        const player = await this.playerService.findOnePlayer(playerId);
    
        const construction = new Construction();
        construction.player = player;
        construction.name = createConstructionDTO.name;
        construction.type = createConstructionDTO.type;
        construction.location = createConstructionDTO.location;

        try {
            return await construction.save();
        } catch (error) {
            throw CustomError.internalServer("Something went wrong");
        }
    }

    async findAllConstructions(playerId: number) {
        const player = await this.playerService.findOnePlayer(playerId);

        if (!player) throw CustomError.notFound("Player not found");

        const constructions = await Construction.find({
            select: {
                id: true,
                name: true,
                type: true,
                level: true,
                location: true,
            },
        })
        return constructions;

    }

}
