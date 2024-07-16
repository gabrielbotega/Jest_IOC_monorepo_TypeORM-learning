import { IUser } from "@/models/users.moldes";
import { injectable } from "inversify/lib/annotation/injectable";

@injectable()
export class UserBasicInfoTransformation {
  public userGreetingsimplePhraseDisplay(user: IUser): string {
    if (user) {
      return `Hi, I'm ${user.firstName} ${user.lastName} and I have ${user.age}`;
    } else {
      return "There's no user found";
    }
  }
}
