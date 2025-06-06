import { sayHello } from "./features/greet";
import { logInfo } from "./utils/logger";

export const runApp = (): void => {
  // Main function to run the application
  logInfo("App started");
  const message = sayHello("Google Apps Script");
  logInfo(`Message: ${message}`);
  logInfo("App finished");
};
