import { GreetFunction } from "@/types/greet";

export const sayHello: GreetFunction = (name) => {
  return `Hello, ${name}!`;
};
