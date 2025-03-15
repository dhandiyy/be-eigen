import { Member } from "../../../domain/aggregates/Member/Member";
import { MemberRepository } from "../../../domain/repositories/IMember.repository";

export class CreateMemberUseCase {
    constructor(private memberRepository: MemberRepository){}

    async execute(input: {name: string}){
        const member = Member.create(input.name);
        await this.memberRepository.save(member);
        return member;
    }
}