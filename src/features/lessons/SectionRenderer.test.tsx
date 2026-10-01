import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { lazy, type ReactNode, useState } from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { CustomSection, LessonSection } from "../../types/lesson";
import * as registry from "./lessonSectionRegistry";
import { SectionRenderer } from "./SectionRenderer";

function wrap(ui: ReactNode) {
  return <MemoryRouter>{ui}</MemoryRouter>;
}

describe("SectionRenderer", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

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

  it("renders a registered custom section by componentKey", async () => {
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

    expect(screen.getByText(/Loading exercise/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Flip practice" }),
      ).toBeInTheDocument();
    });
    expect(
      screen.getByRole("button", { name: /вчора/i }),
    ).toBeInTheDocument();
  });

  it("keeps custom exercise state across parent re-renders", async () => {
    const user = userEvent.setup();
    const section: CustomSection = {
      type: "custom",
      id: "x4",
      title: "Flip practice",
      componentKey: "vocab-flip",
      props: {
        cards: [{ front: "вчора", back: "yesterday", speak: "yesterday" }],
      },
    };

    function Host() {
      const [tick, setTick] = useState(0);
      return (
        <div>
          <button type="button" onClick={() => setTick((n) => n + 1)}>
            bump {tick}
          </button>
          <SectionRenderer section={section} />
        </div>
      );
    }

    const first = registry.lazyCustomSectionComponents["vocab-flip"];
    expect(first).toBeTruthy();

    render(wrap(<Host />));
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /вчора/i }),
      ).toBeInTheDocument();
    });

    const card = screen.getByRole("button", { name: /вчора/i });
    await user.click(card);
    expect(card).toHaveAttribute("aria-pressed", "true");

    await user.click(screen.getByRole("button", { name: /bump 0/i }));

    expect(registry.lazyCustomSectionComponents["vocab-flip"]).toBe(first);
    expect(screen.getByRole("button", { name: /yesterday/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("shows an accessible alert when a custom chunk fails to load", async () => {
    const key = "vocab-flip";
    const original = registry.lazyCustomSectionComponents[key];
    registry.lazyCustomSectionComponents[key] = lazy(() =>
      Promise.reject(new Error("Failed to fetch dynamically imported module")),
    );

    const section: CustomSection = {
      type: "custom",
      id: "x5",
      title: "Broken flip",
      componentKey: key,
      props: {
        cards: [{ front: "а", back: "a" }],
      },
    };

    // React may report the lazy rejection to the console; silence for this case.
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    try {
      render(wrap(<SectionRenderer section={section} />));

      await waitFor(() => {
        expect(screen.getByRole("alert")).toHaveTextContent(
          /Couldn’t load this exercise/i,
        );
      });
      expect(screen.getByText(key)).toBeInTheDocument();
      expect(screen.queryByText(/Loading exercise/i)).not.toBeInTheDocument();
    } finally {
      registry.lazyCustomSectionComponents[key] = original;
      consoleError.mockRestore();
    }
  });
});
