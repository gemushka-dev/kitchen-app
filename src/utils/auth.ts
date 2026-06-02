import { verify } from "jsonwebtoken";
import { cache } from "react";
import { UserPayloadType } from "../types/UserPayloadType";

export const verifyJWT = cache((token: string) => {
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
    return null;
  }
});
