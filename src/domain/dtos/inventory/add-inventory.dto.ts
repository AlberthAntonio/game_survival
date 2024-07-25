
export class AddInventoryDTO {
    private constructor (
        public readonly quantity: number,
        public readonly itemID?: number,
        public readonly resourceID?: number,
    ){}

    static create( object: { [ key: string ]: any } ): [string?, AddInventoryDTO?] {

        const { itemID, quantity, resourceID } = object;

        if (!quantity) return ['Mising quantity']
        if (!itemID && !resourceID) return ['Mising itemID or resourceID']

        return [undefined, new AddInventoryDTO( quantity, itemID, resourceID)];
    }
}