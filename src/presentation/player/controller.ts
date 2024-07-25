import { Request, Response } from "express";
import { CreatePlayerDTO } from "../../domain";
import { PlayerService } from "../services/player.service";
import { CustomError } from "../../domain";
import { AddInventoryDTO } from "../../domain/dtos/inventory/add-inventory.dto";
import { InventoryService } from "../services/inventory.service";

export class PlayerController {
    constructor(
        private readonly playerService: PlayerService,
        private readonly inventoryService: InventoryService,
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ message: error.message })
        }
    
        console.log(error)
        return res.status(500).json({ message: 'Something went very wrong! 🧨' })
    }

    createPlayer = async (req : Request, res : Response) => {
        const [ error, createPlayerDTO ] = CreatePlayerDTO.create(req.body);
        if (error) return res.status(422).json({message: error});

        const sessionUserId = 1; //mas adelante cambia en con la proteccion de rutas

        this.playerService.createPlayer(createPlayerDTO!, sessionUserId)
            .then(player => res.status(201).json(player))
            .catch(error => this.handleError(error, res));
    }

    findOnePlayer = async (req : Request, res : Response) => {
        const { id } = req.params;

        this.playerService.findOnePlayer(+id)
          .then(player => res.status(200).json(player))
          .catch(error => this.handleError(error, res));
    }

    addItemToInventory = async (req : Request, res : Response) => {
        const { id } = req.params;
        const [error, addItemToInventoryDTO] = AddInventoryDTO.create(req.body);

        if (error) return res.status(422).json({message: error});

        this.inventoryService.addItemtoInventory( +id, addItemToInventoryDTO!)
          .then((resp) => res.status(201).json(resp))
          .catch(error => this.handleError(error, res));
    }

    getplayerInventory = async (req : Request, res : Response) => {
      const { id } = req.params;

      this.inventoryService.getplayerInventory(+id)
          .then(resp => res.status(200).json(resp))
          .catch(error => this.handleError(error, res));
    }

}
