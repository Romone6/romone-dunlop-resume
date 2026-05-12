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
  it("renders identity and key homepage sections", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Student\. Operator\. Builder of what matters\./i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Youth Policy & Advisory/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(/At a glance/i)).toBeInTheDocument();
    expect(screen.getByText(/Trusted by & working with/i)).toBeInTheDocument();
    expect(screen.getAllByText(/NSW Youth Advisory Council/i).length).toBeGreaterThan(0);
  });
});
