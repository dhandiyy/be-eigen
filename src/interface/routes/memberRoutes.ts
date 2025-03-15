import { Router } from "express";
import { memberController } from "../../infrastructure/config/bootstrap";

/**
 * @swagger
 * tags:
 *   - name: Members
 *     description: Operasi terkait anggota
 * 
 * /api/members:
 *   post:
 *     summary: Membuat anggota baru
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nama anggota
 *                 example: "Sugeng"
 *     responses:
 *       200:
 *         description: Anggota berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   description: Kode unik anggota
 *                   example: "M005"
 *                 name:
 *                   type: string
 *                   description: Nama anggota
 *                   example: "Sugeng"
 *       400:
 *         description: Bad request - Data tidak valid
 *
 *   get:
 *     summary: Mendapatkan daftar semua anggota
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: Daftar anggota berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: string
 *                     description: Kode unik anggota
 *                     example: "M001"
 *                   name:
 *                     type: string
 *                     description: Nama anggota
 *                     example: "Ahmad"
 *                   status:
 *                     type: string
 *                     description: Status anggota
 *                     example: "ACTIVE"
 *                   borrowedBooksCount:
 *                     type: integer
 *                     description: Jumlah buku yang sedang dipinjam
 *                     example: 4
 */
const memberRouter = Router();
memberRouter.post("/members", memberController.create.bind(memberController));
memberRouter.get("/members", memberController.list.bind(memberController));
export default memberRouter;