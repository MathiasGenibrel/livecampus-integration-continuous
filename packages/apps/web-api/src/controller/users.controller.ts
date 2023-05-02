import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {
  UserCredential,
  UsersContentInput,
  UsersCredentialsInput,
  CredentialToken,
} from '../types/users.types';
import { AppDataSource } from '../database/data-source';
import { Users } from '../database/entity/Users';
import { Repository } from 'typeorm';
import { BadRequestError } from '../error/BadRequestError';
import { environment } from '../environment/environment';

export class UsersController {
  private readonly usersRepository: Repository<Users>;

  constructor() {
    this.usersRepository = AppDataSource.getRepository(Users);
  }

  /**
   * Check if the user is in the database
   * @param email Email corresponding to the user to be verified
   * @private
   */
  private async exists(email: string): Promise<boolean> {
    return await this.usersRepository
      .createQueryBuilder()
      .where({ email })
      .getExists();
  }

  /**
   * Check if the user is already in database,
   * if he's on database throw a BadRequest error.
   * @param email Email corresponding to the user to be verified
   * @private
   */
  private async alreadyExists(email: string): Promise<void> {
    const userExists = await this.exists(email);

    if (userExists)
      throw new BadRequestError(
        'The user with this email already exists',
        'EMAIL IS NOT UNIQUE'
      );
  }

  /**
   * Get user form database with his email.
   * @param email corresponding to the user with this email.
   * @private
   */
  private async getUser(email: string): Promise<Users> {
    const userExists = await this.exists(email);

    if (!userExists)
      throw new BadRequestError(
        'Users with this email does not exists',
        'INVALID EMAIL'
      );

    return await this.usersRepository
      .createQueryBuilder()
      .where({ email })
      .getOne();
  }

  /**
   * Check if the password is equal to the hashed password.
   * @param password Password passed by http request.
   * @param hashedPassword Password save in the database.
   * @private
   */
  private async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<void> {
    const samePassword = await bcrypt.compare(password, hashedPassword);

    if (!samePassword)
      throw new BadRequestError(
        'INVALID PASSWORD',
        'User password is incorrect'
      );
  }

  /**
   * Get user account, response with an "ok" status and return UserCredential.
   * @param req - Express Request type, body && header from the http request.
   * @param res - Express Response, used to respond to the client request.
   */
  public async login(
    req: Request,
    res: Response
  ): Promise<Response<UserCredential>> {
    const usersCredential = res.locals.usersCredential as UsersCredentialsInput;
    const headers = res.locals.credential as CredentialToken;

    try {
      const user = await this.getUser(
        headers ? headers.email : usersCredential.email
      );

      if (headers) {
        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          environment.signedToken
        );

        // Credential to send to the client
        const credential: UserCredential = {
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
          token: token,
        };

        return res.status(200).json(credential);
      }

      // Check if the password is the same as the one in the database
      await this.comparePassword(usersCredential.password, user.password);

      // Generate identification token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        environment.signedToken
      );

      // Credential to send to the client
      const credential: UserCredential = {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        token: token,
      };

      return res.status(200).json(credential);
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof BadRequestError)
        return res.status(err.status).json({
          code: 'Invalid credential',
          message: 'Email or password is incorrect',
        });

      res.status(500).send();
    }
  }

  /**
   * Create user account, response with a "created" status.
   * @param req - Express Request type, body && header from the http request.
   * @param res - Express Response, used to respond to the client request.
   */
  public async register(req: Request, res: Response): Promise<Response<void>> {
    try {
      const usersCredential = res.locals
        .usersCredential as UsersCredentialsInput;
      // Check if the users is already registered
      await this.alreadyExists(usersCredential.email);

      const hashedPassword = await bcrypt.hash(
        usersCredential.password,
        environment.saltRound
      );

      // Insert user in database
      await this.usersRepository.insert({
        ...usersCredential,
        password: hashedPassword,
      });

      return res.status(201).send();
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof BadRequestError)
        return res.status(err.status).json({
          code: err.code,
          message: err.message,
        });

      return res.status(500).send();
    }
  }

  /**
   * Edit user account, response with a "no content" status.
   * @param req - Express Request type, body && header from the http request.
   * @param res - Express Response, used to respond to the client request.
   */
  public async edit(req: Request, res: Response): Promise<Response<void>> {
    const usersContent = res.locals.usersContent as UsersContentInput;
    const credential = res.locals.credential as CredentialToken;

    const hashedPassword =
      usersContent.password &&
      (await bcrypt.hash(usersContent.password, environment.saltRound));

    try {
      await this.exists(credential.email);

      await this.usersRepository.update(
        {
          id: credential.id,
          email: credential.email,
        },
        { ...usersContent, password: hashedPassword }
      );

      return res.status(204).send();
    } catch (err: unknown) {
      console.error(err);

      res.status(500).send();
    }
  }

  /**
   * Delete user account, response with a "no content" status.
   * @param req - Express Request type, body && header from the http request.
   * @param res - Express Response, used to respond to the client request.
   */
  public async delete(req: Request, res: Response): Promise<Response<void>> {
    const credential = res.locals.credential as CredentialToken;

    try {
      await this.usersRepository.delete(credential.id);

      return res.status(204).send();
    } catch (err: unknown) {
      console.error(err);
    }
  }
}
