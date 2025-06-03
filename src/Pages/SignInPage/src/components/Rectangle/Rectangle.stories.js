import { Rectangle } from ".";

export default {
  title: "Components/Rectangle",
  component: Rectangle,

  argTypes: {
    stateProp: {
      options: ["state", "active"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    stateProp: "state",
    className: {},
  },
};
