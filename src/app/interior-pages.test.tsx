import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import AboutPage from "./about/page";
import ContactPage from "./contact/page";
import RolesPage from "./roles/page";
import VisionPage from "./vision/page";

vi.mock("next/navigation", () => ({
  usePathname: () => "/about",
}));

vi.mock("@/components/ui/motion-reveal", () => ({
  MotionReveal: ({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

describe("interior pages", () => {
  it("renders about page leadership emphasis", () => {
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Student\. Operator\. Builder of what matters\./i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/One of 12 voices shaping youth opportunity across NSW\./i)).toBeInTheDocument();
  });

  it("renders contact page email and collaboration section", () => {
    render(<ContactPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Let's build impact together\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", {
        name: /romonedunlop2@gmail\.com/i,
      }).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText(/How I can collaborate/i)).toBeInTheDocument();
  });

  it("renders roles and vision page anchors", () => {
    const { rerender } = render(<RolesPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Current roles\./i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Community & Policy/i)).toBeInTheDocument();

    rerender(<VisionPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /The future I'm building toward\./i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Horizon 01/i)).toBeInTheDocument();
  });
});
