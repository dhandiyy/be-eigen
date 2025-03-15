import { Borrowing } from "../../../domain/aggregates/Borrowing/Borrowing";
import { Penalty } from "../../../domain/aggregates/Penalty/Penalty";
import { BookRepository } from "../../../domain/repositories/IBook.repository";
import { BorrowingRepository } from "../../../domain/repositories/IBorrowing.repository";
import { MemberRepository } from "../../../domain/repositories/IMember.repository";
import { PenaltyRepository } from "../../../domain/repositories/IPenalty.repository";

export class ReturnBookUseCase {
	constructor(
		private borrowingRepository: BorrowingRepository, 
		private bookRepository: BookRepository, 
		private memberRepository: MemberRepository, 
		private penaltyRepository: PenaltyRepository
	) {}

	async execute(borrowingId: string): Promise<Borrowing> {
		const borrowing = await this.borrowingRepository.findById(borrowingId);
		if (!borrowing) {
			throw new Error(`Borrowing with id ${borrowingId} not found`);
		}
		
		const [member, book] = await Promise.all([
			this.memberRepository.findByCode(borrowing.memberCode), 
			this.bookRepository.findByCode(borrowing.bookCode)
		]);

		if (!book) {
			throw new Error(`Book with code ${borrowing.bookCode} not found`);
		}
		if (!member) {
			throw new Error(`Member with code ${borrowing.bookCode} not found`);
		}

		const dueDate = borrowing.dueAt;
		const returnDate = new Date();
		const daysLate = Math.ceil((returnDate.getTime() - dueDate.getTime()) / (1000 * 3600 * 24));

		borrowing.markReturned();
		book.return();

		if (daysLate > 7) {
			const penalty = Penalty.create(member.code);
			member.addPenalty(penalty);
			await this.penaltyRepository.save(penalty);
		}

		await Promise.all([
			this.borrowingRepository.save(borrowing), 
			this.bookRepository.save(book),
			this.memberRepository.save(member)
		]);

		return borrowing;
	}
}
