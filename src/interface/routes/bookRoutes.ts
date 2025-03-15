import { Router } from "express";
import { bookController } from "../../infrastructure/config/bootstrap";

/**
 * @swagger
 * tags:
 *   - name: Books
 *     description: Operasi terkait buku
 *   - name: Borrowing
 *     description: Operasi peminjaman dan pengembalian buku
 * 
 * /api/books:
 *   post:
 *     summary: Membuat buku baru
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - stock
 *             properties:
 *               title:
 *                 type: string
 *                 description: Judul buku
 *                 example: "Twilight3"
 *               author:
 *                 type: string
 *                 description: Penulis buku
 *                 example: "Stephenie Meyer"
 *               stock:
 *                 type: integer
 *                 description: Jumlah stok buku
 *                 example: 3
 *     responses:
 *       200:
 *         description: Buku berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   description: Kode unik buku
 *                   example: "BY7AF"
 *                 title:
 *                   type: string
 *                   description: Judul buku
 *                   example: "Twilight4"
 *                 author:
 *                   type: string
 *                   description: Penulis buku
 *                   example: "Stephenie Meyer"
 *                 stock:
 *                   type: integer
 *                   description: Jumlah stok buku
 *                   example: 4
 *       400:
 *         description: Bad request - Data tidak valid
 *
 *   get:
 *     summary: Mendapatkan daftar semua buku
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Daftar buku berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: Judul buku
 *                     example: "Clean Code"
 *                   author:
 *                     type: string
 *                     description: Penulis buku
 *                     example: "Robert Martin"
 *                   available:
 *                     type: integer
 *                     description: Jumlah buku yang tersedia
 *                     example: 3
 * 
 * /api/book/borrow:
 *   post:
 *     summary: Meminjam buku
 *     tags: [Borrowing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookCode
 *               - memberCode
 *             properties:
 *               bookCode:
 *                 type: string
 *                 description: Kode buku yang akan dipinjam
 *                 example: "B9L8Q"
 *               memberCode:
 *                 type: string
 *                 description: Kode anggota yang meminjam
 *                 example: "M003"
 *     responses:
 *       200:
 *         description: Buku berhasil dipinjam
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID transaksi peminjaman
 *                   example: "1842f108-979f-4b94-b72b-2ceaa7f86224"
 *                 dueDate:
 *                   type: string
 *                   format: date-time
 *                   description: Tanggal jatuh tempo pengembalian
 *                   example: "2025-03-22T15:30:35.348Z"
 *       400:
 *         description: Bad request - Data tidak valid atau buku tidak tersedia
 *       404:
 *         description: Buku atau anggota tidak ditemukan
 * 
 * /api/book/return:
 *   post:
 *     summary: Mengembalikan buku
 *     tags: [Borrowing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID transaksi peminjaman
 *                 example: "4785257f-2210-49af-b564-50327db7f81d"
 *     responses:
 *       200:
 *         description: Buku berhasil dikembalikan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID transaksi peminjaman
 *                   example: "4785257f-2210-49af-b564-50327db7f81d"
 *                 dueDate:
 *                   type: string
 *                   format: date-time
 *                   description: Tanggal jatuh tempo pengembalian
 *                   example: "2025-03-22T14:38:38.831Z"
 *       400:
 *         description: Bad request - Data tidak valid
 *       404:
 *         description: Transaksi peminjaman tidak ditemukan
 */
const bookRouter = Router();
bookRouter.post("/books", bookController.create.bind(bookController));
bookRouter.post("/book/borrow", bookController.borrowBook.bind(bookController));
bookRouter.post("/book/return", bookController.returnBook.bind(bookController));
bookRouter.get("/books", bookController.list.bind(bookController));
export default bookRouter;