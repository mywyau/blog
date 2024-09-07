class UserTypes {
  private constructor(public readonly name: string) { }

  static readonly Viewer = new UserTypes("Viewer");
  static readonly Admin = new UserTypes("Admin");

  toString() {
    return this.name;
  }
}

type UserType =
  typeof UserTypes.Viewer |
  typeof UserTypes.Admin


export default UserTypes;
