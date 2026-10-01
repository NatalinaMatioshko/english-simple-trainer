import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { CustomSection } from "../../../types/lesson";
import { FrequencyGrammarSection } from "./FrequencyGrammarSection";

function grammarSection(): CustomSection {
  return {
    type: "custom",
    id: "test-grammar",
    title: "Present Simple · he / she / it",
    componentKey: "frequency-grammar",
    props: {
      boxTitle: "Present simple · he / she / it",
      examples: [{ id: "e1", text: "She *walks* every day." }],
      choices: [
        {
          id: "c1",
          before: "With he / she / it we usually add",
          after: "to the verb.",
          options: ["-s / -es", "-ing"],
          answer: "-s / -es",
        },
        {
          id: "c2",
          before: "Negative:",
          after: "+ base verb.",
          options: ["doesn't", "don't"],
          answer: "doesn't",
        },
      ],
    },
  };
}

describe("FrequencyGrammarSection", () => {
  it("selects tap choices, checks answers, and resets", async () => {
    const user = userEvent.setup();
    render(<FrequencyGrammarSection section={grammarSection()} />);

    await user.click(screen.getByRole("button", { name: "-s / -es" }));
    await user.click(screen.getByRole("button", { name: "doesn't" }));
    await user.click(screen.getByRole("button", { name: /^Check$/i }));

    expect(screen.getByRole("status")).toHaveTextContent(
      /2 correct, 0 incorrect/i,
    );

    await user.click(screen.getByRole("button", { name: /^Reset$/i }));
    expect(screen.getByRole("status")).toHaveTextContent("");
  });
});
