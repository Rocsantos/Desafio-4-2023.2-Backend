import { z } from "zod";

import { MotoristaPK } from "./motorista.schema";

export const VeiculoPK = z.string().length(7);

export const VeiculoSchema = z.object({
	placa: VeiculoPK,
	marca: z.string().max(50).nonempty(),
	modelo: z.string().max(50).nonempty(),
	ano: z.number().int().positive().min(1890).max(2100),
	corPredominante: z.string().max(20).nonempty(),
	cpf: MotoristaPK,
});

export type Veiculo = z.infer<typeof VeiculoSchema>;
