export default {
  v1: {
    Interfaces: {
      IUser: Symbol("IUser"),
    },
    Services: {
      userService: Symbol("userService"),
    },
    Controllers: {
      userController: Symbol("userController"),
    },
    Dao: {
      userDao: Symbol("userDao"),
    },
    Dto: {
      userDto: Symbol("userDto"),
      userDtoFactory: Symbol("userDtoFactory"),
    },
    Adapters: {
      UserBasicInfoTransformation: Symbol("UserBasicInfoTransformation"),
    },
  },
};
