// ** JWT Service Import
import JwtService from "./jwtService";
import { JWTConfig } from "../../../domains/interfaces/JWTConfig";

// ** Export Service as useJwt
export default function useJwt(jwtOverrideConfig: JWTConfig) {
  const jwt = new JwtService(jwtOverrideConfig);

  return {
    jwt,
  };
}
