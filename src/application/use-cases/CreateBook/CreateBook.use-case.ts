import { Book } from "../../../domain/aggregates/Book/Book";
import { BookRepository } from "../../../domain/repositories/IBook.repository";

export class CreateBookUseCase {
    constructor(private bookRepository: BookRepository){}

    async execute(input: {title: string; author: string; stock: number}){
        const book = Book.create(input.title, input.author, input.stock);
        await this.bookRepository.save(book);
        return book;
    }
}