import { sha256 } from "js-sha256";

export const getHash = (plaintext: string): string => {
  const hash = sha256(plaintext);
  return hash;
};

export const compareHash = (password: string, hash: string): boolean => {
  const match = hash === password;
  return match;
};
