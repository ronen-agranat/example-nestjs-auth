export class CreateUserDto {
  readonly username: string;
  readonly name: string;
  // Do not store or share plaintext password!
  readonly password: string;
}
