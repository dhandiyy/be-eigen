import { Prisma } from "@prisma/client";
import { Penalty } from "../../../domain/aggregates/Penalty/Penalty";

export class PenaltyMapper {
	static toDomain(raw: Prisma.PenaltyGetPayload<true>): Penalty {
		return new Penalty(raw.id, raw.memberCode, raw.startDate, raw.endDate);
	}

	static toPersistence(penalty: Penalty): Prisma.PenaltyCreateInput {
		return {
			id: penalty.id,
			startDate: penalty.startDate,
			endDate: penalty.endDate,
			member: { connect: { code: penalty.memberCode } },
		} satisfies Prisma.PenaltyCreateInput;
	}
}
