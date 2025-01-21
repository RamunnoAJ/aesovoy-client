export enum ClientsRole {
  INDIVIDUAL = "individual",
  WHOLESALER = "wholesaler",
}

export const clientRoleToReadable: Record<ClientsRole, string> = {
  [ClientsRole.INDIVIDUAL]: "Particular",
  [ClientsRole.WHOLESALER]: "Proveedor",
};

export const mapClientRole = (clientRole: string): string => {
  return clientRoleToReadable[clientRole as ClientsRole] || clientRole;
};
