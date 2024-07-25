import { Router } from "express";
import { PlayerRoutes } from "./player/routes";
import { UserRoutes } from "./user/routes";
import { InventoryRoutes } from "./inventory/routes";
import { ClanRoutes } from "./clan/routes";
import { QuestRoutes } from "./quest/routes";
import { ResourcesRoutes } from "./resources/routes";

export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        router.use('/api/v1/player', PlayerRoutes.routes);
        router.use('/api/v1/user', UserRoutes.routes);
        router.use('/api/v1/inventory', InventoryRoutes.routes);
        router.use('/api/v1/clan', ClanRoutes.routes);
        router.use('/api/v1/quest', QuestRoutes.routes);
        router.use('/api/v1/resources', ResourcesRoutes.routes);
       
        return router;
    }
}