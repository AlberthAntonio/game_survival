import { Resource } from "../../data/postgres/models/resources.model";
import { CreateResourceDTO, CustomError } from "../../domain";

export class ResourcesService {

    async createResource(createResourceDTO: CreateResourceDTO) {
        const resourcePromise = this.findOneResource(createResourceDTO.name);

        const resource = new Resource();
        resource.name = createResourceDTO.name.toLocaleLowerCase().trim();
        resource.description = createResourceDTO.description;

        try {
            const existingResource = await resourcePromise;
            if (existingResource) {
                throw CustomError.internalServer("This resource already exist");
            }
            return await resource.save();
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;  
            }
            throw CustomError.internalServer("Something went wrong");
        }
    }

    async findOneResource(name: string) {
        const resource = await Resource.findOne({
            where: {
                name
            }
        });

        if (resource) throw CustomError.notFound('This resource already exist');
        return resource;
    }

    async findAllResources() {
        const resources = await Resource.find({
            select: {
                name: true,
                description: true
            }
        });

        console.log(resources)
        return resources;
    }
}