import { z } from "zod";

export const MotoristaPK = z.string().length(11);

export const MotoristaSchema = z.object({
  cpf: MotoristaPK,
  nome: z.string().max(80).nonempty(),
  dataVencimento: z.date(),
  categoriaCNH: z.enum(["A", "B", "AB"]),
});

export type Motorista = z.infer<typeof MotoristaSchema>;

export const MotoristaPontosSchema = z.object({
  cpf: MotoristaPK,
  nome: z.string().max(80).nonempty(),
  pontos: z.string().nonempty(),
});

export type MotoristaPontos = z.infer<typeof MotoristaPontosSchema>;
