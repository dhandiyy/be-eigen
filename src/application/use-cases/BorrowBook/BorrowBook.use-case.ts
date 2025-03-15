import { Borrowing } from "../../../domain/aggregates/Borrowing/Borrowing";
import { MemberStatus } from "../../../domain/aggregates/enums/MemberStatus";
import { BookRepository } from "../../../domain/repositories/IBook.repository";
import { BorrowingRepository } from "../../../domain/repositories/IBorrowing.repository";
import { MemberRepository } from "../../../domain/repositories/IMember.repository";

export class BorrowBookUseCase {
	constructor(private bookRepository: BookRepository, private memberRepository: MemberRepository, private borrowingRepository: BorrowingRepository) {}

	async execute(input: { bookCode: string; memberCode: string }): Promise<Borrowing> {
		const [book, member] = await Promise.all([this.bookRepository.findByCode(input.bookCode), this.memberRepository.findByCode(input.memberCode)]);

		if (!book) {
			throw new Error(`Book with code ${input.bookCode} not found`);
		}

		if (!member) {
			throw new Error(`Member with code ${input.memberCode} not found`);
		}

		if (member.hasActivePenalty()) {
			const activePenalty = member.penalties.find((p) => p.isActive());
			if (!activePenalty) {
				throw new Error("Inconsistent state: Member flagged with active penalty but no active penalty found");
			}

			const remaining = Math.ceil((activePenalty.endDate.getTime() - Date.now()) / (1000 * 3600 * 24));
			throw new Error(`Member is penalized. Can't borrow for ${remaining} more days`);
		}

		if (member.status !== MemberStatus.ACTIVE) {
			throw new Error("Member is Banned");
		}

		const totalBorrow = await this.borrowingRepository.countActiveBorrowingsByMember(member.code);

		if (totalBorrow >= 2) {
			throw new Error("Member has reached borrow limit");
		}

		const borrowing = Borrowing.create(book.code, member.code, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

		book.borrow();

		await Promise.all([this.bookRepository.save(book), this.borrowingRepository.save(borrowing)]);
		return borrowing;
	}
}
