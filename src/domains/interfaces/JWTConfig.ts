export interface JWTConfig {
  loginEndpoint: string;
  registerEndpoint: string;
  refreshEndpoint: string;
  logoutEndpoint: string;
  tokenType: string;
  storageTokenKeyName: string;
  storageRefreshTokenKeyName: string;
}
