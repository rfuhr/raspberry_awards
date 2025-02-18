import HttpStatusCode from 'http-status-codes';
import { AppError } from './AppError';

export class NotFoundError extends AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.statusCode = HttpStatusCode.NOT_FOUND;
    this.name = 'NotFoundError';
  }
}