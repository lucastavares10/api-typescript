import { CustomError } from "express-handler-errors";

import { AppDataSource } from "../database";

import { User } from "./user.entity";

class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async create(user: User): Promise<User> {
    try {
      const newUser = await this.userRepository.save(user);

      return newUser;
    } catch (e) {
      if (e.code === 11000)
        throw new CustomError({
          code: "USER_ALREADY_EXISTS",
          message: "Usuário já existente",
          status: 409,
        });
      throw e;
    }
  }

  async findOne(id: string): Promise<User> {
    const userId = Number(id);

    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user)
      throw new CustomError({
        code: "USER_NOT_FOUND",
        message: "Usuário não encontrado",
        status: 404,
      });

    return user;
  }

  async update(id: string, user: User): Promise<User> {
    const userId = Number(id);

    const oldUser = await this.userRepository.findOneBy({ id: userId });

    const updatedUser = await this.userRepository.save({ ...oldUser, ...user });

    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    const userId = Number(id);

    const user = await this.userRepository.findOneBy({ id: userId });

    if (user) {
      await this.userRepository.delete(user);
    }

    if (!user)
      throw new CustomError({
        code: "USER_NOT_FOUND",
        message: "Usuário não encontrado",
        status: 404,
      });

    return user;
  }
}

export default new UserService();
