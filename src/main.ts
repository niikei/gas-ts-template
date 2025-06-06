import { runApp } from "./app";

// Function to initialize and run the application
function run(): void {
  Logger.log("main.ts: run() called");
  runApp();
}

// Register globally so GAS can recognize it
(globalThis as any).run = run;
