import { DataSource } from "typeorm";
import { User } from "./models/user.model";
import { Player } from "./models/player.model";
import { Clan_member } from "./models/clan_member.model";
import { Clans } from "./models/clans.model";
import { Construction } from "./models/constructions.model";
import { Inventory } from "./models/inventory.model";
import { Items } from "./models/items.model";
import { Quest_player } from "./models/questPlayer.model";
import { Quest } from "./models/quest.model";
import { Resource } from "./models/resources.model";
import { InventoryItem } from "./models/inventoryItem.model";
import { Inventory_resource } from "./models/inventoryResource.model";

interface Options {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export class PostgresDatabase {
  private datasource: DataSource;

  constructor(options: Options) {
    this.datasource = new DataSource({
      type: "postgres",
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
      database: options.database,
      entities: [User, Player, Construction, Quest_player, Clans, Clan_member, Inventory, InventoryItem, Items, Resource, Inventory_resource, Quest, Quest_player],
      synchronize: true,
    });
  }

  async connect() {
    try {
      await this.datasource.initialize();
      console.log("connected to database ");
    } catch (error) {
      console.log(error);
    }
  }
}
