import { Request, Response } from "express";
import { ResourcesService } from "../services/resources.service";
import { CustomError } from "../../domain";
import { CreateResourceDTO } from "../../domain/dtos/resources/create-resource.dto";

export class ResourcesController {
    constructor(
        private readonly resourcesService: ResourcesService
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ message: error.message })
        }
    
        console.log(error)
        return res.status(500).json({ message: 'Something went very wrong! 🧨' })
      }

    createResource = async (req: Request, res: Response) => {
        const [error, createResourceDTO] = CreateResourceDTO.create(req.body);
        if (error) return res.status(422).json({message: error});

        this.resourcesService.createResource(createResourceDTO!)
            .then(resource => res.status(201).json(resource))
            .catch(error => this.handleError(error, res))
    }

    getResources = async (req: Request, res: Response) => {
        
        this.resourcesService.findAllResources()
            .then(resources => res.status(200).json(resources))
            .catch(error => this.handleError(error, res))
    }
}