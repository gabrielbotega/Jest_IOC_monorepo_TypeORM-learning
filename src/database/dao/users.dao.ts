  public async getUserById(id: string): Promise<IUser> {
    try {
      const user = await AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :id", { id: id })
        .getOneOrFail();

      return user;
    } catch (error) {
      console.log(error);
    }
  }

