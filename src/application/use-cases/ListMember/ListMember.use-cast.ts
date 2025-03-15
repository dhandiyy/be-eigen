import { BorrowingRepository } from "../../../domain/repositories/IBorrowing.repository";
import { MemberRepository } from "../../../domain/repositories/IMember.repository";

export class ListMemberUseCase {
    constructor(
        private memberRepository: MemberRepository,
        private borrowingRepository: BorrowingRepository
    ){}

    async execute(){
        const members = await this.memberRepository.findAll();
        return Promise.all(
            members.map(async (member) => {
                const borrowedCount = await this.borrowingRepository.countActiveBorrowingsByMember(member.code);
                return{
                    code: member.code,
                    name: member.name,
                    status: member.status,
                    borrowedBooksCount: borrowedCount
                };
            })
        );

    }
}