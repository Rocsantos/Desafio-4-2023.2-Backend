import { mysqlConn } from "../base/mysql";
import { type Veiculo, VeiculoSchema } from "../schemas/veiculo.schema";

/**
 * @async Insere Veiculo no banco de dados
 * @param placa Placa do Veiculo
 * @param marca Marca do Veiculo
 * @param modelo Modelo do Veiculo
 * @param ano Ano de Fabricacao do Veiculo
 * @param corPredominante Cor predominante do Veiculo
 * @param cpf CPF do proprietario
 * @returns Veiculo inserido
 */
export const insertVeiculo = async (
  placa: string,
  marca: string,
  modelo: string,
  ano: number,
  corPredominante: string,
  cpf: bigint,
): Promise<Veiculo> => {
  const result = await mysqlConn.execute(
    `
		INSERT INTO VEICULO(placa, marca, modelo, ano, corPredominante, cpf)
		VALUES (?, ?, ?, ?, ?, ?);
	`,
    [placa, marca, modelo, ano, corPredominante, cpf],
  );

  if (result === null) throw new Error("Falha ao inserir Veiculo");

  return VeiculoSchema.parse(result);
};

/**
 * @async
 * @param cpf CPF do Proprietario do(s) Veiculo(s)
 * @return Todos os veiculos do Motorista pesquisado
 */
export const selectVeiculos = async (cpf: bigint): Promise<Veiculo[] | null> => {
  const result = await mysqlConn.execute(`
		SELECT v.* FROM MOTORISTA m
		INNER JOIN VEICULO v ON v.cpf=m.${cpf};
	`);

  if (result === null) return null;

  return VeiculoSchema.array().parse(result);
};
