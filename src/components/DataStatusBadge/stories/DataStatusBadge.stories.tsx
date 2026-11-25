import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { DataStatusBadge } from "../DataStatusBadge";
import { SLOW_REQUEST_THRESHOLD_MS } from "../messages";
import type { PageDataState } from "../../../services/cache";

/**
 * The badge reacts to status changes, so each story starts with a request in
 * progress and moves to the status it showcases.
 */
const StatusSequence = ({ steps }: { steps: PageDataState[] }) => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (stepIndex >= steps.length - 1) {
      return;
    }

    const timeoutId = setTimeout(() => setStepIndex(stepIndex + 1), 300);
    return () => clearTimeout(timeoutId);
  }, [stepIndex, steps.length]);

  return (
    <DataStatusBadge
      dataState={steps[stepIndex]}
      onRetry={() => setStepIndex(0)}
    />
  );
};

/** The badge (stack item) that displays the given text */
const getBadge = (text: HTMLElement) =>
  text.closest<HTMLElement>("[data-badge-id]") as HTMLElement;

// A request that started before the threshold displays the "slow" badge right away
const slowRequest: PageDataState = {
  status: "loading",
  requestedAt: Date.now() - SLOW_REQUEST_THRESHOLD_MS,
};

const meta = {
  title: "Components/DataStatusBadge",
  component: StatusSequence,
  parameters: {
    layout: "fullscreen",
  },
  // Same motion settings as the app (SpaceTourismWebsite)
  decorators: [
    (Story) => (
      <MotionConfig reducedMotion="user">
        <Story />
      </MotionConfig>
    ),
  ],
} satisfies Meta<typeof StatusSequence>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Slow: Story = {
  args: {
    steps: [slowRequest],
  },
  play: async () => {
    const body = within(document.body);
    await expect(await body.findByText(/still loading/i)).toBeInTheDocument();
  },
};

export const RequestFailed: Story = {
  args: {
    steps: [
      // Without `requestedAt` the request counts as just started
      { status: "loading" },
      { status: "error" },
    ],
  },
  play: async () => {
    const body = within(document.body);
    await expect(
      await body.findByText(/couldn't load the latest data/i)
    ).toBeInTheDocument();
    await expect(
      body.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
  },
};

/**
 * The previous badge stays stacked above the new one, dimmed, until it
 * dismisses itself. Dismissing it keeps the new badge in place.
 */
export const UpdatedAfterBeingSlow: Story = {
  args: {
    steps: [slowRequest, slowRequest, { status: "success" }],
  },
  play: async () => {
    const body = within(document.body);
    const updatedBadge = getBadge(await body.findByText(/up to date/i));
    const slowBadge = getBadge(body.getByText(/still loading/i));

    await expect(slowBadge.querySelector("[data-stale]")).toHaveAttribute(
      "data-stale",
      "true"
    );

    await userEvent.click(
      within(slowBadge).getByRole("button", { name: /dismiss notification/i })
    );
    // Waits for the exit animation
    await waitFor(() =>
      expect(body.queryByText(/still loading/i)).not.toBeInTheDocument()
    );
    await expect(updatedBadge).toBeInTheDocument();
  },
};

/** "Try again" marks the error as stale, and the result stacks below it */
export const UpdatedAfterFailing: Story = {
  args: {
    steps: [
      // Without `requestedAt` the request counts as just started
      { status: "loading" },
      { status: "error" },
      { status: "loading" },
      { status: "success" },
    ],
  },
  play: async () => {
    const body = within(document.body);
    await body.findByText(/up to date/i);
    const errorBadge = getBadge(
      body.getByText(/couldn't load the latest data/i)
    );

    // Only the current error can be retried
    await expect(
      within(errorBadge).queryByRole("button", { name: /try again/i })
    ).not.toBeInTheDocument();
  },
};
