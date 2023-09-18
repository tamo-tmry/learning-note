import Message from "./Message.vue";

import type { Meta, StoryObj } from "@storybook/vue3";

const meta: Meta<typeof Message> = {
  title: "Message",
  component: Message,
  render: (args) => ({
    components: { Message },
    tags: ["autodocs"],
    setup() {
      return { args };
    },
    template: '<Message v-bind="args" />',
  }),
};
export default meta;
type Story = StoryObj<typeof Message>;

export const Component: Story = {
  args: {
    message: {
      text: "こんにちは！",
      isMine: true
    }
  },
};