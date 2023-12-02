import { mysqlConn } from "../base/mysql";
import { type TipoMulta, TipoMultaSchema } from "../schemas/tipoMulta.schema";

export const insertTipoMulta = async (descricao: string): Promise<TipoMulta> => {
  const result = await mysqlConn.execute(
    `
		INSERT INTO TIPOMULTA(descricao)
		VALUES (?);
	`,
    [descricao],
  );

  if (result === null) throw new Error("Falha ao inserir TipoMulta");

  return TipoMultaSchema.parse(result);
};

export const selectAllTipoMulta = async (): Promise<TipoMulta[] | null> => {
  const result = await mysqlConn.query(`
		SELECT * FROM TIPOMULTA;
	`);

  if (result === null) return null;

  return TipoMultaSchema.array().parse(result);
};
