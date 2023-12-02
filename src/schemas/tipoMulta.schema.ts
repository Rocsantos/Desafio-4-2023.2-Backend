import { z } from "zod";

export const TipoMultaPK = z.number().positive();

export const TipoMultaSchema = z.object({
	idTipoMulta: TipoMultaPK,
	descricao: z.string().max(60).nonempty()
});

export type TipoMulta = z.infer<typeof TipoMultaSchema>;
