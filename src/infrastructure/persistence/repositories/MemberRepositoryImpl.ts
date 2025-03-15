import { PrismaClient } from "@prisma/client";
import { Member } from "../../../domain/aggregates/Member/Member";
import { MemberRepository } from "../../../domain/repositories/IMember.repository";
import { MemberMapper } from "../mappers/MemberMapper";

export class MemberRepositoryImpl implements MemberRepository{
    constructor(private prisma: PrismaClient){}

    async save(member: Member): Promise<void> {
        const data = MemberMapper.toPersistence(member);
        await this.prisma.member.upsert({
            where: {code: data.code},
            create: data,
            update: data
        });
        
    }

    async findByCode(code: string): Promise<Member | null> {
        const member = await this.prisma.member.findUnique({
            where: {
                code
            }
        });
        return member ? MemberMapper.toDomain(member) : null;
    }

    async findAll(): Promise<Member[]> {
        const members = await this.prisma.member.findMany();
        return members.map(member => MemberMapper.toDomain(member));
    }

    // countActiveBorrowings(memberCode: string): Promise<number> {
    //     throw new Error("Method not implemented.");
    // }

}