import { Navbar } from '@features/base';
import { Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

const navLinks = [
	{ label: 'Home', to: '/' },
	{ label: 'Posts', to: '/posts' },
];

export function BaseLayout() {
	return (
		<>
			<Navbar links={navLinks} />
			<Flex
				as='main'
				direction='column'
				justify='center'
				align='center'
				layerStyle='main'
			>
				<Outlet />
			</Flex>
		</>
	);
}
