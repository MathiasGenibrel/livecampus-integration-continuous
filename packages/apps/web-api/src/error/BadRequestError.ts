export class BadRequestError extends Error {
  public readonly status = 400;
  public code: string;
  public error: unknown;

  constructor(message: string, code: string) {
    super(message);

    this.code = code;
  }
}
