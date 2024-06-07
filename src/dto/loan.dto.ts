import { Book } from './book.dto';
import { User } from './user.dto';

export class Loan {
  user: User | undefined;
  book: Book | undefined;
  loanDate: string | undefined;
  returnDeadline: string | undefined;
  dateOfReturn: string | undefined;
}
