import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import type { CustomSection, LessonSection } from "../../types/lesson";
import { SectionRenderer } from "./SectionRenderer";

function wrap(ui: ReactNode) {
  return <MemoryRouter>{ui}</MemoryRouter>;
}

describe("SectionRenderer", () => {
  it("shows an accessible fallback for an unknown section type", () => {
    const bad = {
      id: "x1",
      type: "not-a-real-type",
      title: "Broken",
    } as unknown as LessonSection;

    render(wrap(<SectionRenderer section={bad} />));

    expect(screen.getByRole("alert")).toHaveTextContent(
      /Unknown section type/i,
    );
    expect(screen.getByText("not-a-real-type")).toBeInTheDocument();
  });

  it("shows an accessible fallback for an unknown custom componentKey", () => {
    const section: CustomSection = {
      type: "custom",
      id: "x2",
      title: "Missing custom",
      componentKey: "does-not-exist-key",
    };

    render(wrap(<SectionRenderer section={section} />));

    expect(screen.getByRole("alert")).toHaveTextContent(
      /Unknown custom section/i,
    );
    expect(screen.getByText("does-not-exist-key")).toBeInTheDocument();
  });

  it("renders a registered custom section by componentKey", () => {
    const section: CustomSection = {
      type: "custom",
      id: "x3",
      title: "Flip practice",
      kicker: "Vocab",
      componentKey: "vocab-flip",
      props: {
        cards: [{ front: "вчора", back: "yesterday", speak: "yesterday" }],
      },
    };

    render(wrap(<SectionRenderer section={section} />));

    expect(
      screen.getByRole("heading", { name: "Flip practice" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /вчора/i }),
    ).toBeInTheDocument();
  });
});
