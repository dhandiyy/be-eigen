import { BorrowingStatus } from "../enums/BorrowingStatus";
import { v4 as uuidv4 } from "uuid";

export class Borrowing {
	constructor(
		public readonly id: string,
		public readonly bookCode: string,
		public readonly memberCode: string,
		public readonly borrowedAt: Date,
		public readonly dueAt: Date,
		public returnedAt: Date | null,
		public status: BorrowingStatus
	) {}

	static create(bookCode: string, memberCode: string, dueAt: Date): Borrowing {
		return new Borrowing(uuidv4(), bookCode, memberCode, new Date(), dueAt, null, BorrowingStatus.BORROWED);
	}

	markReturned(): void {
		this.returnedAt = new Date();
		this.status = BorrowingStatus.RETURNED;
	}

	isOverdue(): boolean {
		return this.dueAt < new Date() && this.status === BorrowingStatus.BORROWED;
	}
}
