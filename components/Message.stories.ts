import Message from "./Message.vue";

import type { Meta, StoryObj } from "@storybook/vue3";

const meta: Meta<typeof Message> = {
  title: "button",
  component: Message,
  render: (args) => ({
    components: { Message },
    tags: ["autodocs"],  // docsが不要だったら削除してOK
    setup() {
      return { args };
    },
    template: '<Message v-bind="args" />',
  }),
  argTypes: {
    label: {
      control: {
        type: "text",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Message>;

export const Component: Story = {
  args: {
    label: "green",
  },
};