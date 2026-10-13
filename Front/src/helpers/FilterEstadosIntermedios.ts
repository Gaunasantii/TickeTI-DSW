import { type estadoModel }  from "../models/estado.model";

export const filterIntermediateStates = (states: estadoModel[]) => {
  return states.filter(state => !state.esEstadoFinal && !state.esEstadoInicial);
};