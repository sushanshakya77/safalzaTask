import {
  Button,
  Container,
  Flex,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import AddDrawer from '../Components/AddDrawer';
import UsersTable from '../Components/UsersTable';
import { IBranchMembers } from '../Models/BranchMembers';

const BranchMembers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [membersData, setMembersData] = React.useState<IBranchMembers>();
  return (
    <div>
      <Container maxW="8xl">
        <Flex style={{ margin: '10px 0px 10px 0px' }}>
          <Text fontSize="2xl">All Users</Text>
          <Spacer />
          <Button
            leftIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-plus"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            }
            colorScheme="teal"
            size="sm"
            onClick={onOpen}
          >
            Add Users
          </Button>
        </Flex>
        <UsersTable onOpen={onOpen} setMembersData={setMembersData} />
        {(isOpen || membersData) && (
          <AddDrawer
            isOpen={isOpen}
            onClose={onClose}
            membersData={membersData}
            setMembersData={setMembersData}
          />
        )}
      </Container>
    </div>
  );
};

export default BranchMembers;
