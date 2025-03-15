import { PrismaClient } from "@prisma/client";
import { BookRepository } from "../../../domain/repositories/IBook.repository";
import { Book } from "../../../domain/aggregates/Book/Book";
import { BookMapper } from "../mappers/BookMapper";

export class BookRepositoryImpl implements BookRepository {
	constructor(private prisma: PrismaClient) {}

	async save(book: Book): Promise<void> {
		const data = BookMapper.toPersistence(book);
		await this.prisma.book.upsert({
			where: {code: data.code},
			create: data,
			update: data
		});
	}

	async findByCode(code: string): Promise<Book | null> {
		const book = await this.prisma.book.findUnique({
			where: {
				code
			}
		});
		return book ? BookMapper.toDomain(book) : null;
	}

	async findAll(): Promise<Book[]> {
		const books = await this.prisma.book.findMany();
		return books.map(book => BookMapper.toDomain(book));
	}
	
	// updateStock(code: string, newStock: number): Promise<void> {
	// 	throw new Error("Method not implemented.");
	// }
}
