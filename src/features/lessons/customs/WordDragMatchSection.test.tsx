import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { CustomSection } from "../../../types/lesson";
import { WordDragMatchSection } from "./WordDragMatchSection";

function matchSection(): CustomSection {
  return {
    type: "custom",
    id: "test-wdm",
    title: "Match the opposites",
    componentKey: "word-drag-match",
    props: {
      items: [
        { id: "1", prompt: "cold", answer: "hot" },
        { id: "2", prompt: "dark", answer: "light" },
      ],
      words: ["light", "hot"],
    },
  };
}

describe("WordDragMatchSection", () => {
  it("places words by tap, checks, shows answers and resets", async () => {
    const user = userEvent.setup();
    render(<WordDragMatchSection section={matchSection()} />);

    // tap word → tap slot
    await user.click(screen.getByRole("button", { name: "light" }));
    await user.click(screen.getByRole("button", { name: "cold: empty" }));
    expect(screen.getByRole("button", { name: "cold: light" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "light" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Check" }));
    expect(screen.getByRole("status")).toHaveTextContent("0 correct, 2 not correct yet.");

    // tap a filled slot → word goes back to the bank
    await user.click(screen.getByRole("button", { name: "cold: light" }));
    expect(screen.getByRole("button", { name: "light" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Show answers" }));
    expect(screen.getByRole("button", { name: "cold: hot" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("2 correct, 0 not correct yet.");

    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByRole("button", { name: "cold: empty" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("");
  });
});
