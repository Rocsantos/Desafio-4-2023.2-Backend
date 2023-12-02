import { type Express } from "express";
import motoristaRoute from "./routes/motorista.routes";
import multaRoute from "./routes/multa.routes";
import tipoMultaRoute from "./routes/tipomulta.routes";
import veiculoRoute from "./routes/veiculo.routes";

export default function routing(app: Express) {
  app.use("/motorista", motoristaRoute);
  app.use("/multa", multaRoute);
  app.use("/tipomulta", tipoMultaRoute);
  app.use("/veiculo", veiculoRoute);
}
