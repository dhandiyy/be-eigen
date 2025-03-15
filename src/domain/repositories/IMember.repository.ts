import { Member } from "../aggregates/Member/Member";

export interface MemberRepository {
	save(member: Member): Promise<void>;
	findByCode(code: string): Promise<Member | null>;
	findAll(): Promise<Member[]>;
	getLastMemberNumber(): Promise<number>
}
