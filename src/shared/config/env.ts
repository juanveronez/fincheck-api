import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, validateSync } from 'class-validator';

class Env {
  @IsNotEmpty()
  jwtSecret: string;

  @IsNotEmpty()
  dbURL: string;
}

export const env: Env = plainToInstance(Env, {
  jwtSecret: process.env.JWT_SECRET,
  dbURL: process.env.DATABASE_URL,
});

validateSync(env).forEach((validation) => {
  throw validation;
});
