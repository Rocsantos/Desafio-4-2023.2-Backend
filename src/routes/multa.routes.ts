import { Router } from "express";
import { MultaSchema } from "../schemas/multa.schema";
import { insertMulta, selectMultaFromCPF } from "../repositories/multa.repository";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { valor, dataMulta, pontosPenalidade, tipoInfracao, placa } = MultaSchema.parse(req.body);
    const multa = insertMulta(valor, dataMulta, pontosPenalidade, tipoInfracao, placa);
    return res.status(201).json(multa);
  } catch (err) {
    return res.status(400).json({ err });
  }
});

router.get("/:cpf", async (req, res) => {
  const result = await selectMultaFromCPF(BigInt(req.params.cpf));

  if (result === null) return res.status(404).statusMessage;

  return res.status(200).json(result);
});

export default router;
