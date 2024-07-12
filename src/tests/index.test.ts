import { Person } from "@/index";

it("should return the name of the passing class", () => {
  const person = new Person();
  expect(person.myName()).toBe("Felipe");
});
