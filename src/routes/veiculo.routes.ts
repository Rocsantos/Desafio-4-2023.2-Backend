import { Router } from "express";
import { VeiculoSchema } from "../schemas/veiculo.schema";
import { insertVeiculo, selectVeiculos } from "../repositories/veiculo.repository";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { placa, marca, modelo, ano, corPredominante, cpf } = VeiculoSchema.parse(req.body);
    const veiculo = insertVeiculo(placa, marca, modelo, ano, corPredominante, cpf);
    return res.status(201).json(veiculo);
  } catch (err) {
    return res.status(400).json({ err });
  }
});

router.get("/:cpf", async (req, res) => {
  const result = await selectVeiculos(BigInt(req.params.cpf));

  if (result === null) return res.status(404).statusMessage;

  return res.status(200).json(result);
});

export default router;
