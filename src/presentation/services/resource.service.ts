import { Resource } from "../../data/postgres/models/resources.model";
import { CustomError } from "../../domain";

export class ResourceService {
    
    async findOneResourceById(id: number) {
        const resource = await Resource.findOne({
            where: {
                id: id,
            },
        })

        if (!resource) throw CustomError.notFound("Item not found");

        return resource;
    }
}