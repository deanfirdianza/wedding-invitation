export class CreateUserDto {
  readonly name: string;
  readonly username: number;
  readonly password: string;
  readonly email: string;
}
  
export class UpdateUserDto {
  readonly name: string;
  readonly email: string;
}  