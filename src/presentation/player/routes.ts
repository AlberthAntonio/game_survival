import { Router } from "express";
import { PlayerController } from "./controller";
import { PlayerService } from "../services/player.service";
import { UserService } from "../services/user.service";
import { InventoryService } from "../services/inventory.service";
import { ItemService } from "../services/item.service";
import { ResourceService } from "../services/resource.service";
import { ConstructionService } from "../services/construction.service";
import { ConstructionController } from "../construction/constroller";


export class PlayerRoutes {

    static get routes(): Router {
        const router = Router();

        const userService = new UserService();
        const playerService = new PlayerService(userService);
        const itemService = new ItemService();
        const resourceService = new ResourceService();
        const inventoryService = new InventoryService(itemService, resourceService);
        const playerController = new PlayerController(playerService, inventoryService);
        const constructionService = new ConstructionService(playerService);
        const constructionController = new ConstructionController(constructionService);

        router.post('/', playerController.createPlayer);
        router.get('/:id' , playerController.findOnePlayer);

        router.get("/:id/inventory", playerController.getplayerInventory);
        router.post('/:id/inventory/items', playerController.addItemToInventory);

        router.post('/:id/construction', constructionController.createConstruction);
        router.get('/:id/construction', constructionController.findAllConstructions);


        return router;
    }
}