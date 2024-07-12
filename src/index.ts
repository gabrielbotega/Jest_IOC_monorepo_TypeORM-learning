export class Person {
  fruit?: IFruit;
  constructor(fruit?: IFruit) {
    this.fruit = fruit;
  }

  public myName(): string {
    return "Felipe";
  }
}

interface IFruit {
  fruitName: string;
}

export class Goiaba implements IFruit {
  fruitName: string = "Goiaba";
}

console.log(new Person({ fruitName: "Maça" }).fruit?.fruitName);
