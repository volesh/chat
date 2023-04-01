import * as bcrypt from 'bcrypt';

export class PasswordHelper {
  hashPass(password: string) {
    return bcrypt.hash(password, 10);
  }

  comparePass(password: string, hashedPass: string) {
    return bcrypt.compare(password, hashedPass);
  }
}
