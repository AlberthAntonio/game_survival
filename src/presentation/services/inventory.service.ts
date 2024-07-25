import { Inventory, Inventory_resource, InventoryItem, Player } from "../../data";
import { Resource } from "../../data/postgres/models/resources.model";
import { CustomError } from "../../domain";
import { AddInventoryDTO } from "../../domain/dtos/inventory/add-inventory.dto";
import { ItemService } from "./item.service";
import { ResourceService } from "./resource.service";

export class InventoryService {

    constructor(
        private readonly itemService: ItemService,
        private readonly resourceService: ResourceService,
    ) {}

    async addItemtoInventory(id: number, addItemToInventoryDTO: AddInventoryDTO) {

        const inventory = await this.findOneInventoryByPlayerID(id);

        // buscar el item y verificar que exista
        if (addItemToInventoryDTO.itemID) {
            const item = await this.itemService.findOneItemById(addItemToInventoryDTO.itemID);
            if (inventory){
                const inventory_item = new InventoryItem();
                inventory_item.item = item;
                inventory_item.quantity = addItemToInventoryDTO.quantity;
                inventory_item.inventory = inventory;
                try {
                    await inventory_item.save();
                } catch (error) {
                    throw CustomError.internalServer("Something went wrong");
                }
            } else {
                const inventory = await this.createInventory(id);
                const inventory_item = new InventoryItem();
                inventory_item.item = item;
                inventory_item.quantity = addItemToInventoryDTO.quantity;
                inventory_item.inventory = inventory;
                try {
                    await inventory_item.save();
                } catch (error) {
                    throw CustomError.internalServer("Something went wrong");
                }
            }
        }
        if (addItemToInventoryDTO.resourceID) {
            const resource = await this.resourceService.findOneResourceById(addItemToInventoryDTO.resourceID);
            if (inventory){
                const inventory_resource = new Inventory_resource();
                inventory_resource.resource = resource;
                inventory_resource.quantity = addItemToInventoryDTO.quantity;
                inventory_resource.inventory = inventory;
                try {
                    await inventory_resource.save();
                } catch (error) {
                    throw CustomError.internalServer("Something went wrong");
                }
            } else {
                const inventory = await this.createInventory(id);
                const inventory_resource = new Inventory_resource();
                inventory_resource.resource = resource;
                inventory_resource.quantity = addItemToInventoryDTO.quantity;
                inventory_resource.inventory = inventory;
                try {
                    await inventory_resource.save();
                } catch (error) {
                    throw CustomError.internalServer("Something went wrong");
                }
            }
        }
        
        return {message: "Object added to inventory"};
    }

    async findOneInventoryByPlayerID(playerId: number) {
        const player = await Player.findOne({
            where: {
                id: playerId
            },
            relations: ['inventory'],
        })

        if (!player) throw CustomError.notFound("Player not found");

        const inventory = player.inventory;

        return inventory;
    }

    async createInventory(playerId: number) {
        const player = await Player.findOne({
            where: {
                id: playerId
            }
        });
        if (!player) throw CustomError.notFound("Player not found");

        const inventory = new Inventory();
        inventory.player = player;

        try {
            return await inventory.save();
        } catch (error) {
            throw CustomError.internalServer("Something went wrong");
        }
    }

    async getplayerInventory(playerId: number) {

        const inventory = await Inventory.findOne({
            where: {
                id: playerId
            },
            relations: [
                'inventory_items',
                'inventory_items.item',
                'inventory_resources',
                'inventory_resources.resource'
            ],
            select: {
                id: true,
                inventory_items: {
                    id: true,
                    item: {
                        name: true,
                        description: true
                    }
                },
                inventory_resources: {
                    id: true,
                    resource: {
                        name: true,
                        description: true
                    }
                }
            }
            
        })

        return inventory;
        
    }
}