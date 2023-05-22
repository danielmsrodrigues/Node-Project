import express, { Request, Response } from "express";
import authRoutes from "./auth";
import utentesRoutes from "./utentes";
import medicosRoutes from "./medicos";
import consultaRoutes from "./consultas";
import { name, version } from "../../package.json";

const router = express.Router();

router.get("/", (req: Request, res: Response) =>
  res.json({
    name,
    version,
  })
);

router.use("/auth", authRoutes);
router.use("/utentes", utentesRoutes);
router.use("/medicos", medicosRoutes);
router.use("/consulta", consultaRoutes);

export default router;
