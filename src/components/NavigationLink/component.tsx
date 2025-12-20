import { NavLink } from 'react-router-dom';
import { chakra } from '@chakra-ui/react';
import {
  recipe,
  type Props,
} from './recipe'

const Component = chakra(NavLink, recipe);

export const NavigationLink = (props: Props) => {

  return (
    <Component to={props.to}>{props.children}</Component>
  )
}
