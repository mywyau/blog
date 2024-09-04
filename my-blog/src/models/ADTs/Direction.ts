class Direction {
    private constructor(public readonly name: string) {}
  
    static readonly Up = new Direction("Up");
    static readonly Down = new Direction("Down");
    static readonly Left = new Direction("Left");
    static readonly Right = new Direction("Right");
  
    toString() {
      return this.name;
    }
  }
  
  type DirectionType = typeof Direction.Up | typeof Direction.Down | typeof Direction.Left | typeof Direction.Right;
  
  // Usage
  let move: DirectionType = Direction.Up;
  
  console.log(move.toString()); // Output: "Up"
  
  export default Direction;