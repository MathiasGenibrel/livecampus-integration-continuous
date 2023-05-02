import { UsersController } from "./users.controller";
import { Request, Response } from "express";
import {
  AbstractUsersController,
  UserCredential,
  UsersRoles,
} from "../types/users.types";

describe("UsersController", () => {
  // Use an abstraction to test only business code
  let controller: AbstractUsersController;
  let mockReq: Partial<Request>;

  beforeEach(() => {
    controller = new UsersController() as unknown as AbstractUsersController;

    // Abstract method from controller
    controller.alreadyExists = async () => {
      return;
    };
    controller.getUser = async () => {
      return {
        id: 1,
        email: "mathias@gmail.com",
        password: "hashedPassword",
        firstname: "mathias",
        lastname: "genibrel",
        role: UsersRoles.CUSTOMER,
      };
    };
    controller.exists = async () => true;
    controller.comparePassword = async () => {
      return;
    };
    controller.usersRepository = {
      insert: async () => {
        return;
      },
      createQueryBuilder: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: async () => {
        return;
      },
    };

    mockReq = {};
  });

  describe("register", () => {
    it("should return a 201 status code", async () => {
      const mockRes: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnValue(undefined),
        locals: {
          usersCredential: {
            email: "mathias.geni@gmail.com",
            password: "longPassword98!",
          },
        },
      };

      const result = await controller.register(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });

  describe("edit", () => {
    it("should return a 204 status code", async () => {
      const mockRes: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnValue(undefined),
        locals: {
          usersContent: {
            firstname: "mathias",
            lastname: "genibrel",
          },
          credential: {
            id: 4,
            email: "mathias.genibrel@gmail.com",
            role: "customer",
          },
        },
      };

      const result = await controller.edit(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.send).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });

  describe("delete", () => {
    it("should return a 204 status code", async () => {
      const mockRes: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnValue(undefined),
        locals: {
          credential: {
            id: 4,
            email: "mathias.genibrel@gmail.com",
            role: "customer",
          },
        },
      };

      const result = await controller.delete(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.send).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
});
