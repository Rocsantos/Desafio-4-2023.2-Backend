import { z } from "zod";

export const MotoristaPK = z.bigint().positive().max(BigInt('99999999999'));

export const MotoristaSchema = z.object({
	cpf: MotoristaPK,
	nome: z.string().max(80).nonempty(),
	dataVencimento: z.date(),
	categoriaCNH: z.enum(['A', 'B', 'AB'])
});

export type Motorista = z.infer<typeof MotoristaSchema>;
