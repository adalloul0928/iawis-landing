import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

test("renders button with correct text", () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
});

test("calls onClick handler when clicked", async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(<Button onClick={handleClick}>Click me</Button>);

  await user.click(screen.getByRole("button"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});