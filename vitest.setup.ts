import React from "react";
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: (props: {
    alt: string;
    src: string | { src: string };
    fill?: boolean;
    priority?: boolean;
    [key: string]: unknown;
  }) => {
    const { src, ...rest } = props;
    const resolvedSrc = typeof src === "string" ? src : src.src;
    const cleanedProps: Record<string, unknown> = { ...rest };
    delete cleanedProps.fill;
    delete cleanedProps.priority;
    return React.createElement("img", { ...cleanedProps, src: resolvedSrc });
  },
}));

vi.mock("next/link", () => ({
  default: (props: { href: string; children: React.ReactNode; [key: string]: unknown }) => {
    const { href, children, ...rest } = props;
    return React.createElement("a", { ...rest, href }, children);
  },
}));
