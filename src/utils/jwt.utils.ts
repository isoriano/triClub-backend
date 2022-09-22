import jwt from "jsonwebtoken";
import config from "config";

const jwtKeys = config.get<{ publicKey: string; privateKey: string }>("jwt");

export const SignJwt = (
  object: Object,
  options?: jwt.SignOptions | undefined
) => {
  return jwt.sign(object, jwtKeys.privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const VerifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, jwtKeys.publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
};
