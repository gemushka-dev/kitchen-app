import { verify } from "jsonwebtoken";
import { UserPayloadType } from "../types/UserPayloadType";

export function verifyJWT(token: string) {
  try {
    if (!process.env.SECRET) throw new Error("Secret key is missing!");
    const decoded = verify(token, process.env.SECRET) as UserPayloadType;
    return {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
    };
  } catch (e) {
    console.error("JWT verification failed:", e);
    return false;
  }
}
