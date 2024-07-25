
export class CreateConstructionDTO {
    private constructor (
        public readonly name: string,
        public readonly type: string,
        public readonly location: string,

    ){}

    static create( object: { [ key: string ]: any } ): [string?, CreateConstructionDTO?] {
        const { name, type, location } = object;

        if (!name) return ['Mising name']
        if (!type) return ['Mising type']
        if (!location) return ['Mising location']

        return [undefined, new CreateConstructionDTO( name, type, location )];
    }
}