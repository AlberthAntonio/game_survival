import { Router } from "express";
import { ResourcesController } from "./controller";
import { ResourcesService } from "../services/resources.service";

export class ResourcesRoutes {
    static get routes(): Router {
        const router = Router();

        const resourcesService = new ResourcesService();
        const resourcesController = new ResourcesController(resourcesService);
        
        router.post('/', resourcesController.createResource);
        router.get('/', resourcesController.getResources);

        return router;
    }
}