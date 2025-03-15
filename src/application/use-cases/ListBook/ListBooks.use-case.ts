import { BookRepository } from "../../../domain/repositories/IBook.repository";
import { BorrowingRepository } from "../../../domain/repositories/IBorrowing.repository";

export class ListBooksUseCase {
    constructor(
        private bookRepository: BookRepository,
        private borrowingRepository: BorrowingRepository
    ){}

    async exucte(){
        const books = await this.bookRepository.findAll();
        const booksWithStock = await Promise.all(
            books.map(async (book) => {
                const borrowedCount = await this.borrowingRepository.countActiveBorrowings(book.code);
                return {
                    ...book,
                    availableStock: book.getavailableStock(borrowedCount)
                };
            })
        );
        return booksWithStock;
    }
    
}