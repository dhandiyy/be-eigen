import { Prisma } from "@prisma/client";
import { Borrowing } from "../../../domain/aggregates/Borrowing/Borrowing";
import { BorrowingStatus } from "../../../domain/aggregates/enums/BorrowingStatus";

export class BorrowingMapper {
	static toDomain(raw: Prisma.BorrowingGetPayload<true>): Borrowing {
		return new Borrowing(
            raw.id, 
            raw.bookCode, 
            raw.memberCode, 
            raw.borrowedAt, 
            raw.dueAt, 
            raw.returnedAt, 
            BorrowingStatus[raw.status as keyof typeof BorrowingStatus]
        );
	}

	static toPersistence(borrowing: Borrowing): Prisma.BorrowingCreateInput {
		return {
			id: borrowing.id,
			book: { connect: { code: borrowing.bookCode } },
			member: { connect: { code: borrowing.memberCode } },
			borrowedAt: borrowing.borrowedAt,
			dueAt: borrowing.dueAt,
			returnedAt: borrowing.returnedAt,
			status: borrowing.status,
		};
	}
}
