import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Select,
  Stack,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { IBranchMembers } from '../Models/BranchMembers';
import {
  IBranchOffice,
  IBranchOfficeWithTotalCount,
} from '../Models/BranchOffice';

interface AddDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  fromBranch?: boolean;
  membersData?: IBranchMembers;
  setMembersData?: React.Dispatch<
    React.SetStateAction<IBranchMembers | undefined>
  >;
  branchOffice?: IBranchOffice;
  setBranchOffice?: React.Dispatch<
    React.SetStateAction<IBranchOffice | undefined>
  >;
}

const AddDrawer = (props: AddDrawerProps) => {
  const {
    isOpen,
    onClose,
    fromBranch,
    membersData,
    setMembersData,
    branchOffice,
    setBranchOffice,
  } = props;

  const toast = useToast();
  const { register, handleSubmit, setValue } = useForm<
    IBranchMembers | IBranchOffice
  >({
    mode: 'onChange',
    defaultValues: {
      memberName: membersData?.memberName,
      memberEmail: membersData?.memberEmail,
      memberPhone: membersData?.memberPhone,
      // branch: membersData?.branch,
      branchName: branchOffice?.branchName,
      branchLocation: branchOffice?.branchLocation,
      branchPhone: branchOffice?.branchPhone,
      branchEmail: branchOffice?.branchEmail,
      branchManager: branchOffice?.branchManager,
      users: branchOffice?.users,
    },
  });
  console.log(membersData);

  const { data, refetch: branchUsersRefetch } =
    useQuery<IBranchMembers[]>('branchMembers');

  const { data: branchOfficeData, refetch: branchOfficeRefetch } =
    useQuery<IBranchOfficeWithTotalCount>(
      'branchOffice',
      async () =>
        await axios.get('/api/branchOffice/get').then((res) => res.data)
    );
  console.log(membersData);
  const onSubmit: SubmitHandler<IBranchMembers | IBranchOffice> = async (
    data
  ) => {
    if (membersData) {
      await axios
        .patch(`/api/branchMembers/update/${membersData._id}`, data)
        .then(() => {
          branchUsersRefetch();
          onClose();
          toast({
            title: 'User Updated.',
            description: "We've updated your info.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        });
    }
    if (!membersData && !fromBranch) {
      await axios.post('/api/branchMembers/create', data).then(() => {
        branchUsersRefetch();
        onClose();
        toast({
          title: 'User Created.',
          description: "We've added your info.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      });
    }

    if (branchOffice) {
      await axios
        .patch(`/api/branchOffice/update/${branchOffice._id}`, data)
        .then(() => {
          branchOfficeRefetch();
          onClose();
          toast({
            title: 'Office Updated.',
            description: "We've updated your info.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        });
    }
    if (!branchOffice && fromBranch) {
      await axios.post('/api/branchOffice/create', data).then(() => {
        branchOfficeRefetch();
        onClose();
      });
    }
  };

  return (
    <div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        onOverlayClick={() => {
          setMembersData?.(undefined);
          setBranchOffice?.(undefined);
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          {fromBranch ? (
            <>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                {branchOffice ? 'Edit Office' : 'Add Office'}
              </DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Box>
                    <FormLabel htmlFor="branchName">Name</FormLabel>
                    <Input
                      id="branchName"
                      placeholder="Please Enter Name"
                      {...register('branchName', { required: true })}
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="branchEmail">Email</FormLabel>
                    <Input
                      id="branchEmail"
                      placeholder="Please Enter Email"
                      {...register('branchEmail', { required: true })}
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="branchLocation">Location</FormLabel>
                    <Input
                      id="branchLocation"
                      placeholder="Please Enter Location"
                      {...register('branchLocation', { required: true })}
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="branchPhone">Phone</FormLabel>
                    <Input
                      id="branchPhone"
                      placeholder="Please Enter Phone"
                      {...register('branchPhone', { required: true })}
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="branchManager">Manager</FormLabel>
                    <Input
                      id="branchManager"
                      placeholder="Please Enter Manager"
                      {...register('branchManager', { required: true })}
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="users">Users</FormLabel>
                    <Input
                      id="users"
                      placeholder="Please Enter Users"
                      {...register('users', { required: true })}
                    />
                  </Box>
                </Stack>
              </DrawerBody>
            </>
          ) : (
            <>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                {membersData ? 'Edit User' : 'Add User'}
              </DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Box>
                    <FormLabel htmlFor="memberName">Name</FormLabel>
                    <Input
                      id="memberName"
                      placeholder="Please Enter Member Name"
                      {...register('memberName', {
                        required: 'Member Name is required!',
                      })}
                    />
                    {/* {errors.memberName && (
                      <Text fontSize="sm" color="red.400">
                        {errors.memberName.message}
                      </Text>
                    )} */}
                  </Box>
                  <Box>
                    <FormLabel htmlFor="memberEmail">Email</FormLabel>
                    <Input
                      id="memberEmail"
                      placeholder="Please Enter Member Email"
                      {...register('memberEmail')}
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="memberPhone">Phone</FormLabel>
                    <Input
                      id="memberPhone"
                      placeholder="Please Enter Member Phone"
                      {...register('memberPhone')}
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="branch">Branch Name</FormLabel>
                    <Select
                      id="branch"
                      placeholder="Please Select Branch Name"
                      value={
                        membersData?.branch._id ? membersData?.branch._id : ''
                      }
                      {...register('branch')}
                    >
                      {branchOfficeData?.data.map((branch) => (
                        <option key={branch._id} value={branch._id}>
                          {branch.branchName}
                        </option>
                      ))}
                    </Select>
                  </Box>
                </Stack>
              </DrawerBody>
            </>
          )}
          <DrawerFooter borderTopWidth="1px">
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                onClose();
                setMembersData?.(undefined);
                setBranchOffice?.(undefined);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              onClick={handleSubmit(onSubmit)}
            >
              {branchOffice
                ? 'Edit Branch'
                : 'Add Branch' && membersData
                ? 'Edit Member'
                : 'Add Member'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AddDrawer;
