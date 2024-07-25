export class JoinMemberDTO {
    private constructor(
        public readonly senderMenberId: number
    ) {}

    static create( object: {[key : string] : any} ): [string? , JoinMemberDTO?] {
        const { senderMenberId } = object;

        if (!senderMenberId) return ['senderMenberId is required']

        return [undefined, new JoinMemberDTO(senderMenberId)]
    }
}