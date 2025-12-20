import { chakra } from "@chakra-ui/react";
import { recipe, type Props } from "./recipe";

const Component = chakra("span", recipe);

export const Tag = ({ children, ...props }: Props) => {
  return (
    <Component {...props}>
      {children}
    </Component>
  );
};
