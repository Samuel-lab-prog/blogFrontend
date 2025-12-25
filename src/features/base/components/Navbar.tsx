import logo from '@assets/logo.svg';
import {
	Box,
	HStack,
	VStack,
	Button,
	useDisclosure,
	Drawer,
	Icon,
	Flex,
	Image,
	Link,
} from '@chakra-ui/react';
import { Menu, X } from 'lucide-react';
import { Outlet, NavLink } from 'react-router-dom';

/* ---------------- LOGO ---------------- */
const Logo = () => (
	<Box>
		<Image
			src={logo}
			alt='Logo'
			h='60px'
		/>
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
		<Container
			gap={isMobile ? 6 : 12}
			align='center'
		>
			{links.map((link) => (
				<Link
					asChild
					color='gray.700'
					padding={2}
					textStyle='description'
					key={link.label}
					onClick={onLinkClick}
					_currentPage={{ fontWeight: 'bold', textDecoration: 'underline' }}
				>
					<NavLink to={link.to}>{link.label}</NavLink>
				</Link>
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
		<Drawer.Root
			size='md'
			open={open}
			onOpenChange={onToggle}
		>
			<Drawer.Trigger asChild>
				<Button
					variant='plain'
					size='sm'
				>
					<Icon
						as={Menu}
						size='2xl'
					/>
				</Button>
			</Drawer.Trigger>

			<Drawer.Backdrop />
			<Drawer.Positioner>
				<Drawer.Content
					bg='gray.100'
					w='full'
					maxW='300px'
					display='flex'
					flexDirection='column'
				>
					<Drawer.Header>
						<Drawer.Title>
							<Logo />
						</Drawer.Title>
						<Drawer.CloseTrigger
							asChild
							pos='initial'
						>
							<Button variant='plain'>
								<Icon
									as={X}
									size='2xl'
								/>
							</Button>
						</Drawer.CloseTrigger>
					</Drawer.Header>
					<Drawer.Body>
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

export function Navbar({ links }: { links: { label: string; to: string }[] }) {
	return (
		<>
			<Flex
				as='nav'
				align='center'
				justify={{ base: 'space-between', md: 'flex-start' }}
				wrap='wrap'
				gap={{ base: 8, lg: 16 }}
				px={{ base: 6, lg: 12 }}
				py={3}
				borderBottom='2px solid'
				borderColor='gray.200'
				mx='auto'
				h={120}
			>
				<Logo />

				{/* Desktop Menu */}
				<Box
					display={{ base: 'none', md: 'block' }}
					ml={12}
				>
					<MenuLinks links={links} />
				</Box>

				{/* Mobile Drawer */}
				<Box display={{ base: 'block', md: 'none' }}>
					<MobileDrawer links={links} />
				</Box>
			</Flex>
			<Outlet />
		</>
	);
}
