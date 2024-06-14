import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto, StartResponse } from './dto/login.dto';
import { Book } from './dto/book.dto';
import { Loan } from './dto/loan.dto';
import { User } from './dto/user.dto';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};

export class LibraryClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8080',
    });
  }

  public async login(
    data: LoginDto,
  ): Promise<ClientResponse<StartResponse | null>> {
    try {
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        '/login',
        data,
      );
      console.log(response.data);

      this.client.defaults.headers.common['Authorization'] =
        `Bearer ${response.data}`;
      let book: AxiosResponse<Book[]> = await this.client.get('/book/getAll');
      console.log(book);
      return {
        success: true,
        data: { token: response.data.token, books: book.data },
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  async getForMe(): Promise<ClientResponse<Loan[] | null>> {
    try {
      const Books = await this.client.get('/loan/getForUser');
      console.log(Books);
      return {
        success: true,
        data: Books.data,
        statusCode: Books.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  async patchBook(formValues: {
    author: string | undefined;
    isbn: string | undefined;
    availableCopies: number | undefined;
    publisher: string | undefined;
    id: number | undefined;
    title: string | undefined;
    yearOfPublish: number | undefined;
  }) {
    try {
      const Books = await this.client.post('/book/add', formValues);
      console.log(Books);
      return {
        success: true,
        data: Books.data,
        statusCode: Books.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  async addBook(formValues: {
    author: string;
    isbn: string;
    availableCopies: string;
    publisher: string;
    title: string;
    yearOfPublish: string;
  }) {
    try {
      const Books = await this.client.post('/book/add', formValues);
      console.log(Books);
      return {
        success: true,
        data: Books.data,
        statusCode: Books.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  async addUser(formValues: {
    password: string;
    role: string;
    fullUsername: string;
    email: string;
    username: string;
  }) {
    try {
      const User = await this.client.post('/user/add', formValues);
      console.log(User);
      return {
        success: true,
        data: User.data,
        statusCode: User.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  async getAllUsers() {
    try {
      const User = await this.client.get('/user/getAll');
      console.log(User);
      return {
        success: true,
        data: User.data,
        statusCode: User.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  async loan(id: number) {
    try {
      const date = new Date();
      const returnDate = new Date(date.getTime() + 1000 * 60 * 60 * 24 * 60);
      let data = {
        user: {},
        book: { id: id },
        loanDate: `${date.getFullYear()}-${(date.getMonth() + 1).toLocaleString(
          'en-US',
          {
            minimumIntegerDigits: 2,
            useGrouping: false,
          },
        )}-${date.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`,
        returnDeadline: `${returnDate.getFullYear()}-${(
          returnDate.getMonth() + 1
        ).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}-${returnDate.getDate().toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}`,
      };
      const response: AxiosResponse<Loan> = await this.client.post(
        '/loan/addForMe',
        data,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  async deleteBook(book: Book) {
    try {
      book.availableCopies = 0;
      const response = await this.client.post('/book/delete', book);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  async return(loan: Loan) {
    try {
      const date = new Date();
      loan.dateOfReturn = `${date.getFullYear()}-${(
        date.getMonth() + 1
      ).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}-${date.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`;
      const response: AxiosResponse<Loan> = await this.client.post(
        '/loan/addForMe',
        loan,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  async deleteUser(user: User) {
    try {
      user.password = '';
      const response = await this.client.post('/user/delete', user);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  async getLoansForUser(id: number) {
    try {
      const loans = await this.client.get('/loan/getByUserID', {
        params: {
          userID: id,
        },
      });
      return {
        success: true,
        data: loans.data,
        statusCode: loans.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  async cancelReturn(loan: Loan) {
    try {
      loan.dateOfReturn = undefined;
      const response: AxiosResponse<Loan> = await this.client.post(
        '/loan/add',
        loan,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  async allBooks() {
    try {
      const books = await this.client.get('/book/getAll');
      return {
        success: true,
        data: books.data,
        statusCode: books.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  async getBook(id: number | undefined) {
    try {
      const books = await this.client.get('/book/getById', {
        params: {
          id: id,
        },
      });
      return {
        success: true,
        data: books.data,
        statusCode: books.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  async test() {
    try {
      const books = await this.client.get('/book/test');
      return {
        success: true,
        data: books.data,
        statusCode: books.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
}
