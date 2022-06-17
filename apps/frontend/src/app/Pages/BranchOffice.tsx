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
import BranchTable from '../Components/BranchTable';
import { IBranchOffice } from '../Models/BranchOffice';

const BranchOffice = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [branchOffice, setBranchOffice] = React.useState<IBranchOffice>();

  const fromBranch = true;
  return (
    <div>
      <Container maxW="8xl">
        <Flex style={{ margin: '10px 0px 10px 0px' }}>
          <Text fontSize="2xl">All Branches</Text>
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
            Add Branch
          </Button>
        </Flex>
        <BranchTable setBranchOffice={setBranchOffice} onOpen={onOpen} />
        {(isOpen || branchOffice) && (
          <AddDrawer
            isOpen={isOpen}
            onClose={onClose}
            fromBranch={fromBranch}
            branchOffice={branchOffice}
            setBranchOffice={setBranchOffice}
          />
        )}
      </Container>
    </div>
  );
};

export default BranchOffice;
