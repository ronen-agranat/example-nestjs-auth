import * as path from 'path';
import * as dotenv from 'dotenv';

const dotenv_path = path.resolve(process.cwd(), `.crypt.env`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) {
  /* do nothing */
}

export const CryptConfig = {
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  saltRounds: process.env.BCRYPT_SALT_ROUNDS
};
