class NavbarPages {
  private constructor(public readonly name: string) { }

  static readonly About = new NavbarPages("About");
  static readonly Contact = new NavbarPages("Contact");
  static readonly Interests = new NavbarPages("Interests");
  static readonly Skills = new NavbarPages("Skills");
  static readonly Worklog = new NavbarPages("Worklog");
  static readonly Assets = new NavbarPages("Assets");
  static readonly Default = new NavbarPages("Default");

  toString() {
    return this.name;
  }
}

type NavbarPage =
  typeof NavbarPages.About |
  typeof NavbarPages.Contact |
  typeof NavbarPages.Interests |
  typeof NavbarPages.Skills |
  typeof NavbarPages.Worklog |
  typeof NavbarPages.Assets |
  typeof NavbarPages.Default;


export default NavbarPages;

// Usage
// let about: NavbarPage = NavbarPages.About;

// console.log(about.toString()); // Output: "Up"

// function handleDirection(direction: DirectionType) {
//   switch (direction) {
//     case Direction.Up:
//       console.log("Moving Up");
//       break;
//     case Direction.Down:
//       console.log("Moving Down");
//       break;
//     case Direction.Left:
//       console.log("Moving Left");
//       break;
//     case Direction.Right:
//       console.log("Moving Right");
//       break;
//     default:
//       const exhaustiveCheck: never = direction;
//       throw new Error(`Unhandled case: ${exhaustiveCheck}`);
//   }
// }

// Usage
// let move: DirectionType = Direction.Up;
// handleDirection(move); // Output: "Moving Up"