import React, { useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Spinner,
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';
import {
  IBranchOffice,
  IBranchOfficeWithTotalCount,
} from '../Models/BranchOffice';
import usePagination from './usePagination';

interface IBranchTable {
  onOpen: () => void;
  setBranchOffice: (branch: IBranchOffice) => void;
}

const BranchTable = (props: IBranchTable) => {
  const { setBranchOffice, onOpen } = props;
  const toast = useToast();
  const { isOpen, onOpen: openAlert, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [sort, setSort] = React.useState('');
  const [search, setSearch] = React.useState('');
  const { pagination, handlePageNumberChange } = usePagination();

  const {
    data: branchOfficeData,
    refetch: branchOfficeRefetch,
    status,
  } = useQuery<IBranchOfficeWithTotalCount>(
    'branchOffice',
    async () =>
      await axios
        .get(
          `/api/branchOffice/get?pageNumber=${pagination.pageNumber}&pageSize=5&order=${sort}&searchTitle=${search}`
        )
        .then((res) => res.data),
    {
      refetchInterval: sort !== '' || search !== '' ? 1000 : 0,
    }
  );

  console.log(status);

  useEffect(() => {
    branchOfficeRefetch();
  }, [pagination.pageNumber, sort, search, branchOfficeRefetch]);

  const handleDelete = async (id: string) => {
    await axios
      .delete(`/api/branchOffice/delete/${id}`)
      .then(() => {
        branchOfficeRefetch();
        toast({
          title: 'Branch Deleted.',
          description: "We've deleted the branch.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(() => {
        openAlert();
      });
  };

  const handleEdit = (branch: IBranchOffice) => {
    setBranchOffice(branch);
    onOpen();
  };

  return (
    <div>
      <Flex style={{ margin: '10px 0px 10px 0px' }}>
        <InputGroup size="md" w="md">
          <Input
            pr="4.5rem"
            type="text"
            placeholder="Search Here..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm">
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
        <Spacer />
        <Button
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-download"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#323233"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
              <polyline points="7 11 12 16 17 11" />
              <line x1="12" y1="4" x2="12" y2="16" />
            </svg>
          }
          variant="outline"
        >
          Export
        </Button>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          motionPreset="slideInBottom"
          onClose={onClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Cannot Delete
              </AlertDialogHeader>

              <AlertDialogBody>
                The Branch cannot be deleted because it is assigned with the
                member.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button colorScheme="red" ref={cancelRef} onClick={onClose}>
                  OK
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-sort-descending"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#404141"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="4" y1="6" x2="13" y2="6" />
                <line x1="4" y1="12" x2="11" y2="12" />
                <line x1="4" y1="18" x2="11" y2="18" />
                <polyline points="15 15 18 18 21 15" />
                <line x1="18" y1="6" x2="18" y2="18" />
              </svg>
            }
            ml="3"
          >
            Sort By:
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                setSort('1');
                branchOfficeRefetch();
              }}
            >
              Branch Name (A to Z)
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSort('-1');
                branchOfficeRefetch();
              }}
            >
              Branch Name (Z to A){' '}
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <TableContainer>
        <ChakraTable>
          <Thead bgColor="#ddd">
            <Tr>
              <Th>Branch</Th>
              <Th>Users</Th>
              <Th>Location</Th>
              <Th>Manager</Th>
              <Th>Phone Numbers</Th>
              <Th>Email</Th>
              <Th w="36">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {branchOfficeData?.data?.map((user) => (
              <Tr key={user.branchName}>
                <Td>{user.branchName}</Td>
                <Td>{user.users}</Td>
                <Td> {user.branchLocation} </Td>
                <Td> {user.branchManager} </Td>

                <Td>{user.branchPhone}</Td>
                <Td> {user.branchEmail} </Td>
                <Td>
                  <Flex>
                    <IconButton
                      colorScheme="teal"
                      aria-label="Call "
                      size="md"
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-edit"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#f8fbff"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                          <line x1="16" y1="5" x2="19" y2="8" />
                        </svg>
                      }
                      onClick={() => handleEdit(user)}
                    />
                    <Spacer />
                    <IconButton
                      colorScheme="teal"
                      aria-label="Call Segun"
                      size="md"
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-trash"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#fcfcfc"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <line x1="4" y1="7" x2="20" y2="7" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                      }
                      onClick={() => {
                        handleDelete(user._id);
                      }}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Td>
                <Flex>
                  <IconButton
                    aria-label="prev"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-left"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#1f1f1f"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <polyline points="15 6 9 12 15 18" />
                      </svg>
                    }
                    onClick={() => {
                      handlePageNumberChange(pagination.pageNumber - 1);
                    }}
                    disabled={branchOfficeData?.startIndex === 0}
                  />
                  <Text px={3} mt={2}>
                    Pages {pagination.pageNumber} of{' '}
                    {branchOfficeData?.endIndex}
                  </Text>
                  <IconButton
                    aria-label="next"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-right"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#252525"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <polyline points="9 6 15 12 9 18" />
                      </svg>
                    }
                    onClick={() => {
                      handlePageNumberChange(pagination.pageNumber + 1);
                    }}
                    disabled={branchOfficeData?.endIndex === 0}
                  />
                </Flex>
              </Td>
            </Tr>
          </Tfoot>
        </ChakraTable>
      </TableContainer>
    </div>
  );
};

export default BranchTable;
