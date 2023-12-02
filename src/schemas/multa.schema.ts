import { z } from "zod";

import { TipoMultaPK } from "./tipoMulta.schema";
import { VeiculoPK } from "./veiculo.schema";

export const MultaSchema = z.object({
	valor: z.number().nonnegative().finite(),
	dataMulta: z.date(),
	pontosPenalidade: z.number().int().positive(),
	tipoInfracao: TipoMultaPK,
	placa: VeiculoPK
});

export type Multa = z.infer<typeof MultaSchema>;
