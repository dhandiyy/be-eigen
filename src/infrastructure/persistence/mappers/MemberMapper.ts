import { Prisma } from "@prisma/client";
import { Member } from "../../../domain/aggregates/Member/Member";
import { MemberStatus } from "../../../domain/aggregates/enums/MemberStatus";

export class MemberMapper {
	static toDomain(raw: Prisma.MemberGetPayload<true>): Member {
		return new Member(
            raw.code, 
            raw.name, 
            MemberStatus[raw.status as keyof typeof MemberStatus]
        );
	}

	static toPersistence(member: Member): Prisma.MemberCreateInput {
		return {
			code: member.code,
			name: member.name,
			status: member.status as keyof typeof MemberStatus,
		}satisfies Prisma.MemberCreateInput;
	}
}
