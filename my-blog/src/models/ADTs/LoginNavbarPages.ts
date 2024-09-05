class LoginNavbarPages {
  private constructor(public readonly name: string) { }

  static readonly Login = new LoginNavbarPages("Login");
  static readonly CreateAccount = new LoginNavbarPages("CreateAccount");
  static readonly ForgottenPassword = new LoginNavbarPages("ForgottenPassword");
  static readonly RecoverUsername = new LoginNavbarPages("RecoverUsername");
  static readonly Default = new LoginNavbarPages("Default");

  toString() {
    return this.name;
  }
}

type LoginNavbarPage =
  typeof LoginNavbarPages.Login |
  typeof LoginNavbarPages.CreateAccount |
  typeof LoginNavbarPages.ForgottenPassword |
  typeof LoginNavbarPages.RecoverUsername |
  typeof LoginNavbarPages.Default;


export default LoginNavbarPages;