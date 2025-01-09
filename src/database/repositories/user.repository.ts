import { BaseRepository } from "./base.repository";
import { User, UserModel } from "../models/user.model";

class UserRepository extends BaseRepository<User> {
  constructor() {
    super(UserModel);
  }
}

export const userRepository = new UserRepository();