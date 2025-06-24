import "vitest";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/types/matchers";

declare module "vitest" {
  interface Assertion<T = any> extends TestingLibraryMatchers<T, void> {}
}
