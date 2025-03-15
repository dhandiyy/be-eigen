import { PrismaClient } from "@prisma/client";
import { Borrowing } from "../../../domain/aggregates/Borrowing/Borrowing";
import { BorrowingRepository } from "../../../domain/repositories/IBorrowing.repository";
import { BorrowingMapper } from "../mappers/BorrowingMapper";
import { BorrowingStatus } from "../../../domain/aggregates/enums/BorrowingStatus";

export class BorrowingRepositoryImpl implements BorrowingRepository {
	constructor(private prisma: PrismaClient) {}

	async findById(borrowingId: string): Promise<Borrowing | null> {
		const borrowing = await this.prisma.borrowing.findUnique({
			where: {
				id: borrowingId
			}
		});

		return borrowing ? BorrowingMapper.toDomain(borrowing) : null;
	}

	countActiveBorrowingsByMember(memberCode: string): Promise<number> {
		return this.prisma.borrowing.count({
			where: {
				memberCode,
				status: BorrowingStatus.BORROWED,
			},
		});
	}

	async save(borrowing: Borrowing): Promise<void> {
		const data = BorrowingMapper.toPersistence(borrowing);
		await this.prisma.borrowing.upsert({
			where: { id: data.id },
			create: data,
			update: data,
		});
	}
	async countActiveBorrowings(bookCode: string): Promise<number> {
		return this.prisma.borrowing.count({
			where: {
				bookCode,
				status: BorrowingStatus.BORROWED,
			},
		});
	}
}
