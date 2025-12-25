import { NavLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

type NavigationLinkProps = {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export const NavigationLink = ({
  to,
  children,
  onClick,
}: NavigationLinkProps) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Button
          variant="link"
          fontWeight={isActive ? 'bold' : 'normal'}
          _hover={{ opacity: 0.8 }}
          px={1}
          py={1}
          onClick={onClick}
        >
          {children}
        </Button>
      )}
    </NavLink>
  );
};
