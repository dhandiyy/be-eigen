import { MemberStatus } from "../enums/MemberStatus";
import { Penalty } from "../Penalty/Penalty";

export class Member {

    constructor(
        public readonly code: string,
        public name: string,
        public status: MemberStatus = MemberStatus.ACTIVE,
        public penalties: Penalty[] = []
    ) {}

    static create(name: string, lastMemberNumber: number): Member {
        const memberNumber = lastMemberNumber + 1;
        const code = `M${memberNumber.toString().padStart(3, '0')}`;
        return new Member(code, name);
    }

    addPenalty(penalty: Penalty): void {
        this.penalties.push(penalty);
        this.status = MemberStatus.BANNED;
    }
    
    hasActivePenalty(): boolean {
        return this.penalties.some(p => p.isActive());
    }
}