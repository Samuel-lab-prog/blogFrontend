import logo from '../assets/logo.svg';

import {
  Box,
  HStack,
  VStack,
  Link,
  Button,
  useDisclosure,
  Drawer,
  Portal,
  CloseButton,
  Icon,
  Flex,
  Image
} from "@chakra-ui/react";
import { Menu } from "lucide-react";
import { Outlet } from 'react-router-dom';

/* ---------------- LOGO ---------------- */
const Logo = () => {
  return (
    <Box>
      <Image src={logo} alt="Logo" height="40px" />
    </Box>
  );
};

const MenuLinks = ({ isMobile = false, links }: { isMobile?: boolean, links: { label: string; to: string }[] }) => {
  const LinkComponent = isMobile ? VStack : HStack;

  return (
    <LinkComponent gap={isMobile ? 4 : 8} align="center">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.to}
          fontWeight="medium"
          color="blue.600"
          _hover={{
            color: "blue.500",
            textDecoration: "underline",
          }}
          transition="color 0.2s ease"
        >
          {link.label}
        </Link>
      ))}
    </LinkComponent>
  );
};

/* ---------------- MOBILE DRAWER ---------------- */
const MobileDrawer = ({ links }: { links: { label: string; to: string }[] }) => {
  const { open, onToggle } = useDisclosure();

  return (
    <Drawer.Root open={open} onOpenChange={onToggle} size="full">
      <Drawer.Trigger asChild>
        <Button variant="outline" size="sm">
          <Icon color="blue.600">
            <Menu />
          </Icon>
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>
                <Logo />
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <MenuLinks isMobile links={links} />
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="md" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

/* ---------------- NAVBAR ---------------- */
export default function Navbar({ links }: { links: { label: string; to: string }[] }) {

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        gap={{ base: 8, lg: 16 }}
        px={{ base: 6, lg: 12 }}
        py={3}
        maxW={{ base: "full", xl: "1440px" }}
        mx="auto"
      >
        <Logo />

        {/* Desktop Menu */}
        <Box display={{ base: "none", md: "block" }}>
          <MenuLinks links={links} />
        </Box>

        {/* Mobile Drawer */}
        <Box display={{ base: "block", md: "none" }}>
          <MobileDrawer links={links} />
        </Box>
      </Flex>
      <Outlet></Outlet>
    </>
  );
};

