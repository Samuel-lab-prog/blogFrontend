import logo from '@assets/logo.svg';
import {
  Box,
  HStack,
  VStack,
  Button,
  useDisclosure,
  Drawer,
  CloseButton,
  Icon,
  Flex,
  Image,
} from '@chakra-ui/react';
import { NavigationLink } from '@root/features/base/components/NavigationLink';
import { Menu } from 'lucide-react';

/* ---------------- LOGO ---------------- */
const Logo = () => (
  <Box>
    <Image src={logo} alt="Logo" h="60px" />
  </Box>
);

/* ---------------- MENU LINKS ---------------- */
const MenuLinks = ({
  links,
  isMobile = false,
  onLinkClick,
}: {
  links: { label: string; to: string }[];
  isMobile?: boolean;
  onLinkClick?: () => void;
}) => {
  const Container = isMobile ? VStack : HStack;

  return (
    <Container gap={isMobile ? 4 : 8} align="center">
      {links.map((link) => (
        <NavigationLink
          key={link.label}
          to={link.to}
          onClick={onLinkClick} // chama toggle ao clicar
        >
          {link.label}
        </NavigationLink>
      ))}
    </Container>
  );
};

/* ---------------- MOBILE DRAWER ---------------- */
const MobileDrawer = ({
  links,
}: {
  links: { label: string; to: string }[];
}) => {
  const { open, onToggle } = useDisclosure();

  return (
    <Drawer.Root size="md" open={open} onOpenChange={onToggle}>
      <Drawer.Trigger asChild>
        <Button variant="ghost" size="sm">
          <Icon as={Menu} color="blue.600" />
        </Button>
      </Drawer.Trigger>

      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content
          bg="white"
          w="full"
          maxW="300px"
          display="flex"
          flexDirection="column"
        >
          <Drawer.Header>
            <Drawer.Title>
              <Logo />
            </Drawer.Title>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="md" />
            </Drawer.CloseTrigger>
          </Drawer.Header>
          <Drawer.Body>
            {/* Passa onToggle para fechar ao clicar */}
            <MenuLinks
              links={links}
              isMobile
              onLinkClick={onToggle}
            />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};

/* ---------------- NAVBAR ---------------- */
export function Navbar({
  links,
}: {
  links: { label: string; to: string }[];
}) {
  return (
    <Flex
      as="nav"
      align="center"
      justify={{ base: 'space-between', md: 'flex-start' }}
      wrap="wrap"
      gap={{ base: 8, lg: 16 }}
      px={{ base: 6, lg: 12 }}
      py={3}
      borderBottom="2px solid"
      borderColor="gray.200"
      mx="auto"
      h={120}
    >
      <Logo />

      {/* Desktop Menu */}
      <Box display={{ base: 'none', md: 'block' }} ml={12}>
        <MenuLinks links={links} />
      </Box>

      {/* Mobile Drawer */}
      <Box display={{ base: 'block', md: 'none' }}>
        <MobileDrawer links={links} />
      </Box>
    </Flex>
  );
}
