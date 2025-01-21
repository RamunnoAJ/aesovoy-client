export enum State {
  TODO = "todo",
  DONE = "done",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export const stateToReadable: Record<State, string> = {
  [State.TODO]: "Pendiente",
  [State.DONE]: "Terminado",
  [State.DELIVERED]: "Entregado",
  [State.CANCELLED]: "Cancelado",
};

export const mapState = (state: string): string => {
  return stateToReadable[state as State] || state;
};
