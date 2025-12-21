import { NavLink } from 'react-router-dom';
import { chakra } from '@chakra-ui/react';
import { recipe, type NavigationLinkProps } from './recipe';

const Component = chakra(NavLink, recipe);

export const NavigationLink = (props: NavigationLinkProps) => {
  return <Component to={props.to}>{props.children}</Component>;
};
