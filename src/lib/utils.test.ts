import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("merges classes and resolves Tailwind conflicts", () => {
    const result = cn("px-2 text-sm", "px-4", false && "hidden", "text-sm");
    expect(result).toContain("px-4");
    expect(result).not.toContain("px-2");
  });
});
