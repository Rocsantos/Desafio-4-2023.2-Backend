import { mysqlConn } from "../base/mysql";
import {
  type Motorista,
  MotoristaSchema,
  type MotoristaPontos,
  MotoristaPontosSchema,
} from "../schemas/motorista.schema";

/**
 * @async Insere Motorista no banco de dados
 * @param cpf CPF do Motorista
 * @param nome nome do Motorista
 * @param dataVencimento data em que vence a CNH do motorista
 * @param categoriaCNH categoria da CNH do motorista entre A, B e AB
 * @returns Motorista inserido
 */
export const insertMotorista = async (
  cpf: bigint,
  nome: string,
  dataVencimento: Date,
  categoriaCNH: string,
): Promise<Motorista> => {
  const result = await mysqlConn.execute(
    `
		INSERT INTO MOTORISTA(cpf, nome, dataVencimento, categoriaCNH)
		VALUES (?, ?, ?, ?);
	`,
    [cpf, nome, dataVencimento, categoriaCNH],
  );

  if (result === null) throw new Error("Falha ao inserir Motorista");

  return MotoristaSchema.parse(result);
};

/**
 * @async
 * @returns Todos os motoristas cadastrados
 */
export const selectAllMotorista = async (): Promise<Motorista[] | null> => {
  const result = await mysqlConn.execute(`
		SELECT * FROM MOTORISTA;
	`);

  if (result === null) return null;

  return MotoristaSchema.array().parse(result);
};

/**
 * @async
 * @returns Todos os motoristas com mais de 10 pontos
 */
export const selectMotoristaPontuado10 = async (): Promise<MotoristaPontos[] | null> => {
  const result = await mysqlConn.execute(`
		SELECT m.cpf, m.nome, SUM(ml.pontosPenalidade) AS pontos FROM MOTORISTA m
			INNER JOIN VEICULO v ON v.cpf=m.cpf
			INNER JOIN MULTA ml ON ml.placa=v.placa
			GROUP BY cpf
    	HAVING pontos >= 10;
	`);

  if (result === null) return null;

  return MotoristaPontosSchema.array().parse(result);
};
