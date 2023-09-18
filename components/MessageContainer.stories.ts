import MessageContainer from "./MessageContainer.vue";

import type { Meta, StoryObj } from "@storybook/vue3";

const meta: Meta<typeof MessageContainer> = {
  title: "MessageContainer",
  component: MessageContainer,
  render: (args) => ({
    components: { MessageContainer },
    tags: ["autodocs"],
    setup() {
      return { args };
    },
    template: '<MessageContainer v-bind="args" />',
  }),
};
export default meta;
type Story = StoryObj<typeof MessageContainer>;

export const Component: Story = {
  args: {
    messages: [
      {
        text: "こんにちは！",
        isMine: true
      },
      {
        text: "なんですか？",
        isMine: false
      }
    ],
  },
};