import { Router } from "express";
import { ClanController } from "./controller";
import { ClanService } from "../services/clan.service";
import { PlayerService } from "../services/player.service";
import { UserService } from "../services/user.service";

export class ClanRoutes {
    static get routes(): Router {
        const router = Router();

        const userService = new UserService();
        const playerService = new PlayerService(userService);
        const clanService = new ClanService(playerService);
        const clanController = new ClanController(clanService);
        
        router.post("/:playerReceiverId/join", clanController.addmemberToClan);

        return router;
    }

    
}