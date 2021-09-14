import { guard, get, body, request, post } from "strongly";
import { UserService } from "../../services/user/user.service";
import { User } from "../../domain/user";

@guard(user => user.role === "admin")
export class AdminController {
  constructor(private userService: UserService) {}
  @get users() {
    return this.userService.getUsers({ _isDeleted: undefined });
  }

  private async addUser(user: User) {
    const existUser = await this.userService.userRepo.findOne({ email: user.email, _isDeleted: undefined });
    if (existUser) throw new Error("The user already exist");
    const result = await this.userService.saveOrUpdateUser(user);
    this.userService.sentPermission(user.email);
    return result;
  }

  @post saveOrUpdateUser(@body user: User): Promise<User> {
    user = new User(user);
    if (!user._id) {
      return this.addUser(user);
    }

    return this.userService.saveOrUpdateUser(user);
  }

  @post deleteUser(@body user: User): Promise<User> {
    user = new User(user);
    user._isDeleted = true;
    return this.userService.saveOrUpdateUser(user);
  }

  @post unDeleteUser(@body user: User): Promise<User> {
    user = new User(user);
    user._isDeleted = undefined;
    return this.userService.saveOrUpdateUser(user);
  }
}
