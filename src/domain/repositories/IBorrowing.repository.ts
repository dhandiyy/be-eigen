import { Borrowing } from "../aggregates/Borrowing/Borrowing";

export interface BorrowingRepository {
	save(borrowing: Borrowing): Promise<void>;
	countActiveBorrowings(bookCode: string): Promise<number>;
	countActiveBorrowingsByMember(memberCode: string): Promise<number>;
	findById(borrowingId: string): Promise<Borrowing | null>
	// updateBorrowing(borrowing: Borrowing): Promise<void>;
}
