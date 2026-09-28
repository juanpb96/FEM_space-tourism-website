import { useEffect, useState } from "react";
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
      { status: "loading", requestedAt: Date.now() },
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

export const UpdatedAfterBeingSlow: Story = {
  args: {
    steps: [slowRequest, slowRequest, { status: "success" }],
  },
  play: async () => {
    const body = within(document.body);
    await expect(await body.findByText(/up to date/i)).toBeInTheDocument();
  },
};

export const Dismissed: Story = {
  args: {
    steps: [slowRequest],
  },
  play: async () => {
    const body = within(document.body);
    await body.findByText(/still loading/i);
    await userEvent.click(
      body.getByRole("button", { name: /dismiss notification/i })
    );
    // Waits for the exit animation
    await waitFor(() =>
      expect(body.queryByText(/still loading/i)).not.toBeInTheDocument()
    );
  },
};
