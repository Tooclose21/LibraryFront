import { Book } from './book.dto';

export class LoginDto {
  username: string | undefined;
  password: string | undefined;
}

export class LoginResponseDto {
  token: string | undefined;
}

export class StartResponse {
  token: string | undefined;
  books: Book[] | undefined;
}
