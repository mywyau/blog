class CreateUserFormStates {
  private constructor(public readonly name: string) { }

  static readonly Valid = new CreateUserFormStates("Valid");
  static readonly Invalid = new CreateUserFormStates("Invalid");
  static readonly Empty = new CreateUserFormStates("Empty");
  static readonly Default = new CreateUserFormStates("Default");

  toString() {
    return this.name;
  }
}

type CreateUserFormState =
  typeof CreateUserFormStates.Valid |
  typeof CreateUserFormStates.Invalid |
  typeof CreateUserFormStates.Empty |
  typeof CreateUserFormStates.Default;


export default CreateUserFormStates;