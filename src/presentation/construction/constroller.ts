import { Request, Response } from "express";
import { ConstructionService } from "../services/construction.service";
import { CreateConstructionDTO } from "../../domain/dtos/construction/construction.dto";
import { CustomError } from "../../domain";

export class ConstructionController {

    constructor(
        private readonly constructionService: ConstructionService
    ) {}
    
    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ message: error.message })
        }
    
        console.log(error)
        return res.status(500).json({ message: 'Something went very wrong! 🧨' })
    }

    createConstruction = async (req: Request, res: Response) => {
        const { id } = req.params;
        const [error, createConstructionDTO] = CreateConstructionDTO.create(req.body);

        if (error) return res.status(422).json({message: error});
    
        this.constructionService.createConstruction(+id, createConstructionDTO!)
            .then(construction => res.status(201).json(construction))
            .catch(error => this.handleError(error, res));
    }

    findAllConstructions = async (req: Request, res: Response) => {
        const { id } = req.params;

        this.constructionService.findAllConstructions(+id)
            .then(constructions => res.status(200).json(constructions))
            .catch(error => this.handleError(error, res));
    }
}