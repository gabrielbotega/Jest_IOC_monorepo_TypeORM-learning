import { Person } from "@/index";

describe("Some class tests here with DI", () => {
  it("should return the name of the passing class", () => {
    const person = new Person();
    expect(person.myName()).toBe("Felipe");
  });

  it("Gonna test the injection of some fruits", () => {
    expect(new Person({ fruitName: "Maça" }).fruit?.fruitName).toBe("Maça");
  });
});
