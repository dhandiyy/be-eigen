import { Prisma } from "@prisma/client";
import { Book } from "../../../domain/aggregates/Book/Book";
import { BookStatus } from "../../../domain/aggregates/enums/BookStatus";

export class BookMapper {
    static toDomain(raw: Prisma.BookGetPayload<true>): Book{
        //validasi can be here loh!
        if (!(raw.status in BookStatus)) {
            throw new Error(`Invalid book status: ${raw.status}`);
        }
        return new Book(
            raw.code,
            raw.title,
            raw.author,
            raw.stock,
            BookStatus[raw.status as keyof typeof BookStatus]
        );
    }

    static toPersistence(book: Book): Prisma.BookCreateInput{
        return {
            code: book.code,
            title: book.title,
            author: book.author,
            stock: book.stock,
            status: book.status
        }satisfies Prisma.BookCreateInput;
    }
}