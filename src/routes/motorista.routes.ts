import { Router } from "express";
import {
  insertMotorista,
  selectAllMotorista,
  selectMotoristaPontuado10,
} from "../repositories/motorista.repository";
import { MotoristaSchema } from "../schemas/motorista.schema";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { cpf, categoriaCNH, dataVencimento, nome } = MotoristaSchema.parse(req.body);
    const motorista = insertMotorista(cpf, nome, dataVencimento, categoriaCNH);
    return res.status(201).json(motorista);
  } catch (err) {
    return res.status(400).json({ err });
  }
});

router.get("/", async (req, res) => {
  const result = await selectAllMotorista();

  if (result === null) return res.status(404).statusMessage;

  return res.status(200).json(result);
});

router.get("/pontua", async (req, res) => {
  const result = await selectMotoristaPontuado10();

  if (result === null) return res.status(404).statusMessage;

  return res.status(200).json(result);
});

export default router;
