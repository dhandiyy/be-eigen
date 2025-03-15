import { Request, Response } from "express";
import { CreateBookUseCase } from "../../application/use-cases/CreateBook/CreateBook.use-case";
import { z } from "zod";
import { ListBooksUseCase } from "../../application/use-cases/ListBook/ListBooks.use-case";
import { BorrowBookUseCase } from "../../application/use-cases/BorrowBook/BorrowBook.use-case";
import { ReturnBookUseCase } from "../../application/use-cases/ReturnBook/ReturnBook.use-case";

export class BookController {
	constructor(private createBookUseCase: CreateBookUseCase, private listBooksUseCase: ListBooksUseCase, private borrowBookUseCase: BorrowBookUseCase, private returnBookUseCase: ReturnBookUseCase) {}

	async create(req: Request, res: Response) {
		const schema = z.object({
			title: z.string().min(2),
			author: z.string().min(3),
			stock: z.number().int().min(1),
		});

		try {
			const input = schema.parse(req.body);
			const book = await this.createBookUseCase.execute(input);
			res.status(201).json({
				code: book.code,
				title: book.title,
				author: book.author,
				stock: book.stock,
			});
		} catch (error) {
			res.status(400).json({
				error: error instanceof Error ? error.message : String(error),
			});
		}
	}

	async list(_req: Request, res: Response) {
		const books = await this.listBooksUseCase.exucte();
		res.json(
			books.map((book) => ({
				title: book.title,
				author: book.author,
				available: book.availableStock,
			}))
		);
	}

	async borrowBook(req: Request, res: Response) {
		const schema = z.object({
			bookCode: z.string(),
			memberCode: z.string().regex(/^M\d{2,}$/, "Member code invalid (ex: M001)"),
		});

		try {
			const input = schema.parse(req.body);
			const borrowing = await this.borrowBookUseCase.execute(input);
			res.status(201).json({
				id: borrowing.id,
				dueDate: borrowing.dueAt,
			});
		} catch (error) {
			res.status(400).json({
				error: error instanceof Error ? error.message : String(error),
			});
		}
	}

	async returnBook(req: Request, res: Response) {
		const schema = z.object({
			id: z.string(),
		});

		try {
			const input = schema.parse(req.body);
			const borrowing = await this.returnBookUseCase.execute(input.id);
			res.status(201).json({
				id: borrowing.id,
				dueDate: borrowing.dueAt,
			});
		} catch (error) {
			res.status(400).json({
				error: error instanceof Error ? error.message : String(error),
			});
		}
	}
}
