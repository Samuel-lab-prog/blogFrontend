export type AppErrorType = {
  statusCode?: number;
  errorMessages?: string[];
  originalError?: Error;
};

export class AppError extends Error {
  public statusCode: number;
  public errorMessages: string[];
  public originalError?: Error;

  constructor({ statusCode = 500, errorMessages = ['Application Error'], originalError }: AppErrorType = {}) {
    super(errorMessages.join(', '));

    this.name = 'AppError';
    this.statusCode = statusCode;
    this.errorMessages = errorMessages;
    this.originalError = originalError;

    // captureStackTrace não existe no navegador, podemos ignorar
  }
}