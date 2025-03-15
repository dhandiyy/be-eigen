import { BookStatus } from "../enums/BookStatus";

export class Book {
	constructor(
		public readonly code: string, 
		public title: string, 
		public author: string, 
		public stock: number, 
		public status: BookStatus = BookStatus.AVAILABLE
	) {
		if (stock < 0) throw new Error("Stock cannot be negative");
	}

	static create(title: string, author: string, stock: number): Book {
		const code = `B${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
		return new Book(code, title, author, stock);
	}

	getavailableStock(borrowdCount: number): number {
		return this.stock - borrowdCount;
	}

	borrow(): void {
		if (this.stock <= 0) {
			throw new Error("Book out of stock");
		}

		this.stock--;

		if (this.stock === 0) {
			this.status = BookStatus.UNAVAILABLE;
		}
	}

	return(): void {
		this.stock++;
		this.status = BookStatus.AVAILABLE;
	}
}
