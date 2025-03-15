import { Book } from "../aggregates/Book/Book";

export interface BookRepository {
	save(book: Book): Promise<void>;
	findByCode(code: string): Promise<Book | null>;
	findAll(): Promise<Book[]>;
	// updateStock(code: string, newStock: number): Promise<void>;
}
