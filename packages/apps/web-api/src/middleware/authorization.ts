import * as jwt from 'jsonwebtoken';
import { JsonWebTokenError } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { CredentialToken, UsersRoles } from '../types/users.types';
import { environment } from '../environment/environment';
import { BadRequestError } from '../error/BadRequestError';

export class Authorization {
  private getUsersCredential(authorization: string): CredentialToken {
    const decodedToken: RegExpMatchArray | null =
      authorization.match(/(?<=Bearer\s)\S+/);

    if (!decodedToken)
      throw new BadRequestError(
        'Your token is invalid, try again',
        'INVALID TOKEN'
      );

    return jwt.verify(
      decodedToken[0],
      environment.signedToken
    ) as CredentialToken;
  }

  private getCredentials({ headers }: Request): CredentialToken {
    const authorization = headers.authorization;

    if (!authorization)
      throw new BadRequestError(
        'Your token is invalid, try again',
        'INVALID TOKEN'
      );

    return this.getUsersCredential(authorization);
  }

  public connectionWithToken(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.headers.authorization === 'Bearer null')
        return res.status(201).json(null);

      res.locals.credential = this.getCredentials(req);

      next();
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof JsonWebTokenError)
        return res.status(400).json({
          code: err.name,
          message: err.message,
        });

      if (err instanceof BadRequestError)
        return res.status(err.status).json({
          code: err.code,
          message: err.message,
        });

      res.status(500).send();
    }
  }

  public customer(req: Request, res: Response, next: NextFunction) {
    try {
      res.locals.credential = this.getCredentials(req);

      next();
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof JsonWebTokenError)
        return res.status(400).json({
          code: err.name,
          message: err.message,
        });

      if (err instanceof BadRequestError)
        return res.status(err.status).json({
          code: err.code,
          message: err.message,
        });

      res.status(500).send();
    }
  }

  public admin(req: Request, res: Response, next: NextFunction) {
    try {
      const credential = this.getCredentials(req);

      if (credential.role !== UsersRoles.ADMIN)
        return res.status(400).json({
          code: 'INVALID CREDENTIAL',
          message: 'You are not an admin user',
        });

      res.locals.credential = credential;

      next();
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof JsonWebTokenError)
        return res.status(400).json({
          code: err.name,
          message: err.message,
        });

      if (err instanceof BadRequestError)
        return res.status(err.status).json({
          code: err.code,
          message: err.message,
        });

      res.status(500).send();
    }
  }
}
