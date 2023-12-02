import { mysqlConn } from "../base/mysql";
import { type Multa, MultaSchema } from "../schemas/multa.schema";

/**
 * @async Insere a Multa no banco de dados.
 * @param valor Valor da Multa
 * @param dataMulta Data em que a multa foi registrada
 * @param pontosPenalidade Pontos aplicados à carteira, devido a multa
 * @param tipoInfracao Número que identifica qual foi o tipo da infração
 * @param placa Placa do Veiculo multado
 * @returns Multa inserida
 */
export const insertMulta = async (
  valor: number,
  dataMulta: Date,
  pontosPenalidade: number,
  tipoInfracao: number,
  placa: string,
): Promise<Multa> => {
  const result = await mysqlConn.execute(
    `
		INSERT INTO MULTA(valor, dataMulta, pontosPenalidade, tipoInfracao, placa)
		VALUES (?, ?, ?, ?, ?);
	`,
    [valor, dataMulta, pontosPenalidade, tipoInfracao, placa],
  );

  if (result === null) throw new Error("Falha ao inserir Multa");

  return MultaSchema.parse(result);
};

/**
 * @async
 * @param cpf CPF do motorista, qual está pesquisando as multas
 * @returns Multas do motorista Pesquisado
 */
export const selectMultaFromCPF = async (cpf: bigint): Promise<Multa[] | null> => {
  const result = await mysqlConn.execute(
    `
		SELECT ml.* FROM MOTORISTA m
		INNER JOIN VEICULO v ON v.cpf=m.cpf and m.cpf=?
		INNER JOIN MULTA ml ON ml.placa=v.placa
		ORDER BY dataMulta;
	`,
    [cpf],
  );

  if (result === null) return null;

  return MultaSchema.array().parse(result);
};
