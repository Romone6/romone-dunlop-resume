import { describe, expect, it } from "vitest";

import {
  eventItems,
  getFeaturedProjects,
  heroContent,
  organisationItems,
  projectItems,
  roleItems,
  socialLinks,
  futurePlanItems,
} from "./site";

describe("site content", () => {
  it("has at least one featured project", () => {
    expect(getFeaturedProjects().length).toBeGreaterThan(0);
  });

  it("ensures social links use safe protocols", () => {
    for (const link of socialLinks) {
      expect(link.href).toMatch(/^(https:\/\/|mailto:)/);
    }
  });

  it("contains current roles and future plans", () => {
    expect(roleItems.some((role) => role.status === "Current")).toBe(true);
    expect(futurePlanItems.length).toBeGreaterThanOrEqual(3);
  });

  it("matches the current public-facing roles and projects", () => {
    expect(roleItems.some((role) => role.title === "Year 12 Student")).toBe(true);
    expect(roleItems.some((role) => role.title === "Manager / Crew Trainer")).toBe(true);
    expect(roleItems.some((role) => role.title === "Government-Appointed Youth Advisor")).toBe(true);
    expect(roleItems.some((role) => role.organisation === "MindBridge Health Technologies")).toBe(
      true,
    );
    expect(projectItems.map((project) => project.name)).toEqual([
      "MindBridge Health",
      "Pathway to Entry",
      "AgentOS",
      "Operator Layer",
      "Verblayer",
      "Regional Pathways Work",
    ]);
  });

  it("keeps the active public link set aligned with the current profile", () => {
    expect(socialLinks.map((link) => link.platform)).toEqual([
      "Instagram",
      "LinkedIn",
      "GitHub",
      "X",
      "Email",
    ]);
    expect(socialLinks.find((link) => link.platform === "Email")?.label).toContain(
      "romonedunlop2@gmail.com",
    );
    expect(roleItems.length).toBeGreaterThanOrEqual(12);
    expect(projectItems).toHaveLength(6);
    expect(eventItems).toHaveLength(3);
  });

  it("emphasizes NSW Youth Advisory Council across the structured content", () => {
    expect(heroContent.supportingCopy).toContain("NSW Youth Advisory Council");
    expect(heroContent.chips).toContain("NSW Youth Advisory Council");
    expect(roleItems[0]?.organisation).toBe("NSW Youth Advisory Council");
    expect(organisationItems[0]?.name).toBe("Office for Youth");
    expect(projectItems.find((project) => project.name === "Regional Pathways Work")?.tags).toContain(
      "NSW Youth Advisory Council",
    );
  });
});
