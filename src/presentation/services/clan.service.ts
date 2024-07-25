import { Clan_member, RoleClan } from "../../data";
import { CustomError } from "../../domain";
import { JoinMemberDTO } from "../../domain/dtos/clan/join-member.dto";
import { PlayerService } from "./player.service";

export class ClanService {
    constructor(
        private readonly playerService: PlayerService,
    ) {}
    
    async addMemberToClan(playerReceiverId: number, joinMemberDTO: JoinMemberDTO){
        const playerReceiverPromise = this.playerService.findOnePlayer(playerReceiverId);
        const playerSenderPromise = this.playerService.findOnePlayer(joinMemberDTO.senderMenberId);

        const [playerReceiver, playerSender] = await Promise.all([playerReceiverPromise, playerSenderPromise]);

        if (!playerReceiver) return CustomError.notFound('Player Receiver not found');
        if (!playerSender) return CustomError.notFound('Player Sender not found');

        const allowedRoles = [RoleClan.MASTER, RoleClan.OFFICER, RoleClan.SUBOFFICER];

        if(!allowedRoles.includes(playerSender.clan_members[0].role)){
            throw CustomError.badRequest("You don't have permission to join this clan")
        }

        const clan_member = new Clan_member();
        clan_member.player = playerReceiver;
        clan_member.clans = playerSender.clan_members[0].clans;

        try {
            return await clan_member.save();
        } catch (error) {
            throw CustomError.internalServer("Internal server error");
        }
    }
}