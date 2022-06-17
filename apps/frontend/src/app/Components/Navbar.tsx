import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Buttons = [
  {
    name: 'Branch Office',
    link: '/',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-building"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#2d2d2e"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="3" y1="21" x2="21" y2="21" />
        <line x1="9" y1="8" x2="10" y2="8" />
        <line x1="9" y1="12" x2="10" y2="12" />
        <line x1="9" y1="16" x2="10" y2="16" />
        <line x1="14" y1="8" x2="15" y2="8" />
        <line x1="14" y1="12" x2="15" y2="12" />
        <line x1="14" y1="16" x2="15" y2="16" />
        <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" />
      </svg>
    ),
  },
  {
    name: 'Branch Members',
    link: '/users',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-users"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#2d2d2e"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="9" cy="7" r="4" />
        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
      </svg>
    ),
  },
];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Box
        w="100%"
        p={'16px 10px 16px 60px'}
        borderBottom="1px solid #ecebeb"
        color="black"
      >
        <Flex>
          <IconButton aria-label="Hamburger" size="md" onClick={onOpen}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-menu-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#282828"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </IconButton>
        </Flex>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Safalza Task</DrawerHeader>
          <DrawerBody>
            <Stack>
              {Buttons.map((button) => (
                <Link key={button.name} to={button.link}>
                  <Button leftIcon={button.icon} w="100%" onClick={onClose}>
                    {button.name}
                  </Button>
                </Link>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Navbar;
