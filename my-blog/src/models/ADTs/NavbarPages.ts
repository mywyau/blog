class NavbarPages {
  private constructor(public readonly name: string) { }

  static readonly Home = new NavbarPages("Home");
  static readonly About = new NavbarPages("About");
  static readonly Contact = new NavbarPages("Contact");
  static readonly Interests = new NavbarPages("Interests");
  static readonly Skills = new NavbarPages("Skills");
  static readonly Worklog = new NavbarPages("Worklog");
  static readonly Assets = new NavbarPages("Assets");
  static readonly Login = new NavbarPages("Login");
  static readonly Default = new NavbarPages("Default");

  toString() {
    return this.name;
  }
}

type NavbarPage =
  typeof NavbarPages.Home |
  typeof NavbarPages.About |
  typeof NavbarPages.Contact |
  typeof NavbarPages.Interests |
  typeof NavbarPages.Skills |
  typeof NavbarPages.Worklog |
  typeof NavbarPages.Assets |
  typeof NavbarPages.Login |
  typeof NavbarPages.Default;


export default NavbarPages;