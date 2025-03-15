import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import bookRouter from "./interface/routes/bookRoutes";
import memberRouter from "./interface/routes/memberRoutes";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../swagger';

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", bookRouter);
app.use("/api", memberRouter);

// Error handling
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
	console.error(err.stack);
	res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
prisma
	.$connect()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
			console.log(`Prisma connected to ${process.env.DATABASE_URL}`);
		});
	})
	.catch((error) => {
		console.error("Database connection failed", error);
		process.exit(1);
	});
