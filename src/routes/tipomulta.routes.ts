import { Router } from "express";
import { TipoMultaSchema } from "../schemas/tipoMulta.schema";
import { insertTipoMulta, selectAllTipoMulta } from "../repositories/tipoMulta.repository";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { descricao } = TipoMultaSchema.parse(req.body);
    const motorista = insertTipoMulta(descricao);
    return res.status(201).json(motorista);
  } catch (err) {
    return res.status(400).json({ err });
  }
});

router.get("/", async (req, res) => {
  const result = await selectAllTipoMulta();

  if (result === null) return res.status(404).statusMessage;

  return res.status(200).json(result);
});

export default router;
