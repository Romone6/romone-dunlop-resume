import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import Home from "./page";

vi.mock("@/components/ui/motion-reveal", () => ({
  MotionReveal: ({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

describe("home page", () => {
  it("renders identity and key section headings", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Romone - student, operator, and builder shaping what comes next/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Roles and focus areas right now/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Active projects with clear intent/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getAllByText(/NSW Youth Advisory Council/i).length).toBeGreaterThan(0);
  });
});
