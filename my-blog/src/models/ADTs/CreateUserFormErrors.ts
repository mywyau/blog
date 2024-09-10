class CreateUserFormErrors {
  private constructor(public readonly name: string) { }

  static readonly EmptyUsername = new CreateUserFormErrors("EmptyUsername");
  static readonly UsernameInvalid = new CreateUserFormErrors("UsernameInvalid");
  static readonly UsernameAlreadyTaken = new CreateUserFormErrors("UsernameAlreadyTaken");
  static readonly Default = new CreateUserFormErrors("Default");

  toString() {
    return this.name;
  }
}

type CreateUserFormError =
  typeof CreateUserFormErrors.EmptyUsername |
  typeof CreateUserFormErrors.UsernameInvalid |
  typeof CreateUserFormErrors.UsernameAlreadyTaken |
  typeof CreateUserFormErrors.Default;


export default CreateUserFormErrors;