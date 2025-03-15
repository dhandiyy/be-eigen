import { MemberStatus } from "../enums/MemberStatus";
import { Penalty } from "../Penalty/Penalty";

export class Member {
    private static lastId = 0;

    constructor(
        public readonly code: string,
        public name: string,
        public status: MemberStatus = MemberStatus.ACTIVE,
        public penalties: Penalty[] = []
    ) {}

    static create(name: string): Member {
        Member.lastId++;
        const code = `M${Member.lastId.toString().padStart(3, '0')}`;
        return new Member(code, name);
    }

    addPenalty(penalty: Penalty): void {
        this.penalties.push(penalty);
    }
    
    hasActivePenalty(): boolean {
        return this.penalties.some(p => p.isActive());
    }
}