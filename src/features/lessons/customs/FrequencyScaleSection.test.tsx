import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { CustomSection } from "../../../types/lesson";
import { FrequencyScaleSection } from "./FrequencyScaleSection";

function scaleSection(): CustomSection {
  return {
    type: "custom",
    id: "test-scale",
    title: "Complete the frequency scale",
    componentKey: "frequency-scale",
    props: {
      options: ["never", "sometimes", "often", "usually", "always"],
      steps: [
        { type: "gap", id: "1", percent: "0%", answer: "never" },
        { type: "gap", id: "2", answer: "sometimes" },
        { type: "fixed", label: "often" },
        { type: "fixed", label: "usually" },
        { type: "gap", id: "3", percent: "100%", answer: "always" },
      ],
    },
  };
}

describe("FrequencyScaleSection", () => {
  it("checks gap answers and announces score", async () => {
    const user = userEvent.setup();
    render(<FrequencyScaleSection section={scaleSection()} />);

    expect(
      screen.getByRole("group", { name: /Frequency scale/i }),
    ).toBeInTheDocument();
    // Fixed labels appear as <strong> (options also contain the same words)
    expect(screen.getAllByText("often").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("usually").length).toBeGreaterThanOrEqual(1);

    await user.selectOptions(
      screen.getByRole("combobox", { name: /Frequency gap 1/i }),
      "never",
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: /Frequency gap 2/i }),
      "sometimes",
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: /Frequency gap 3/i }),
      "always",
    );
    await user.click(screen.getByRole("button", { name: /^Check$/i }));

    expect(screen.getByRole("status")).toHaveTextContent(
      /You got 3 out of 3 correct/i,
    );
  });
});
