import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { CustomSection } from "../../../types/lesson";
import { VocabFlipSection } from "./VocabFlipSection";
import { TickListSection } from "./TickListSection";
import { PhotoSentenceMatchSection } from "./PhotoSentenceMatchSection";

function vocabSection(over: Partial<CustomSection> = {}): CustomSection {
  return {
    type: "custom",
    id: "test-vocab",
    title: "Travel chunks",
    componentKey: "vocab-flip",
    props: {
      cards: [
        {
          front: "автобусом",
          back: "by bus",
          speak: "by bus",
        },
      ],
    },
    ...over,
  };
}

function tickSection(): CustomSection {
  return {
    type: "custom",
    id: "test-tick",
    title: "What do you hear?",
    componentKey: "tick-list",
    props: {
      items: [
        { id: "1", label: "Do you cycle to work every day?", correct: true },
        { id: "2", label: "Do you drive to work?", correct: false },
      ],
    },
  };
}

function photoSection(): CustomSection {
  return {
    type: "custom",
    id: "test-photo",
    title: "Match photos",
    componentKey: "photo-sentence-match",
    props: {
      images: [
        {
          id: "A",
          src: "/images/lesson42/travel-a-bus.png",
          alt: "buses at a stop",
          answer: "1",
        },
        {
          id: "B",
          src: "/images/lesson42/travel-g-walk.png",
          alt: "person walking",
          answer: "2",
        },
      ],
      options: [
        { value: "1", label: "1. I go to work by bus." },
        { value: "2", label: "2. I walk home." },
      ],
    },
  };
}

describe("VocabFlipSection", () => {
  it("toggles card state with Enter and Space", async () => {
    const user = userEvent.setup();
    render(<VocabFlipSection section={vocabSection()} />);

    const card = screen.getByRole("button", {
      name: /Українською: автобусом\. Press to reveal/i,
    });
    expect(card).toHaveAttribute("aria-pressed", "false");

    card.focus();
    expect(card).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(card).toHaveAttribute("aria-pressed", "true");
    expect(card).toHaveAccessibleName(/English: by bus\. Press to hide/i);

    expect(card).toHaveFocus();
    await user.keyboard(" ");
    expect(card).toHaveAttribute("aria-pressed", "false");
  });
});

describe("TickListSection", () => {
  it("allows changing checkboxes before Check", async () => {
    const user = userEvent.setup();
    render(<TickListSection section={tickSection()} />);

    const boxes = screen.getAllByRole("checkbox");
    expect(boxes[0]).not.toBeChecked();
    await user.click(boxes[0]);
    expect(boxes[0]).toBeChecked();
    await user.click(boxes[0]);
    expect(boxes[0]).not.toBeChecked();
  });

  it("shows text score status after Check", async () => {
    const user = userEvent.setup();
    render(<TickListSection section={tickSection()} />);

    await user.click(screen.getAllByRole("checkbox")[0]);
    await user.click(screen.getByRole("button", { name: "Check" }));

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent(/correct/i);
    expect(status).toHaveTextContent(/incorrect/i);
  });
});

describe("PhotoSentenceMatchSection", () => {
  it("announces text feedback in a status region after Check", async () => {
    const user = userEvent.setup();
    render(<PhotoSentenceMatchSection section={photoSection()} />);

    const selectA = screen.getByLabelText(/Photo A:/i);
    await user.selectOptions(selectA, "1");
    await user.click(screen.getByRole("button", { name: "Check" }));

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent(/You got 1 out of 2 correct/i);
    expect(screen.getByText("Correct")).toBeInTheDocument();
    expect(screen.getByText("Not answered")).toBeInTheDocument();
  });
});
