export interface UserAccount {
  userId: string;
  email: string;
  tenantId: string;
  fullName: string;
  currentSuscriptionId: string | null;
}
