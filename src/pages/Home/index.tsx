import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useCallback, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../api/UserAPI";
import { UserTable } from "../../components/UserTable/UserTable";
import UserTableRow from "../../components/UserTable/UserTableRow";
import { User } from "../../api/UserAPI/user.type";
import NewUserTableRow from "../../components/UserTable/NewUserTableRow";
import Spinner from "../../layout/Spinner/Spinner";
import useSortQueryTable from "../../hooks/useSortQueryTable";

const Home: FC = () => {
  const queryClient = useQueryClient();

  const [createNewUserFlag, setcreateNewUserFlag] = useState<boolean>(false);
  // Fetch users
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const { sortedList, setSortKey, sortKey, direction, setDirection } =
    useSortQueryTable<User>({
      list: users || [],
      defaultKey: "name",
    });

  // Create user
  const createUserMutation = useMutation({
    mutationFn: (user: User) => {
      setcreateNewUserFlag(false);
      return createUser(user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Update user
  const updateUserMutation = useMutation({
    mutationFn: ({ id, user }: { id: string; user: User }) =>
      updateUser(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Delete user
  const deleteUserMutation = useMutation({
    mutationFn: (id: String) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleSort = useCallback(
    (key: keyof User) => {
      if (key === sortKey) {
        setDirection(direction === "asc" ? "desc" : "asc");
      } else {
        setSortKey(key);
        setDirection("asc");
      }
    },
    [sortKey, direction, setSortKey, setDirection]
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Overview</h1>
      <p>Here you can find user details.</p>
      <div className="mx-auto md:max-w-[90%]">
        <div className="flex justify-end items-center">
          <button
            onClick={() => setcreateNewUserFlag(true)}
            className="mr-2 mb-2 p-1 rounded-full"
          >
            New user
          </button>
        </div>
        {isLoading && (
          <div className="flex justify-center">
            <Spinner></Spinner>
          </div>
        )}
        {sortedList && (
          <UserTable
            onHeaderClick={handleSort}
            activeSort={{ key: sortKey as keyof User, direction: direction }}
          >
            {createNewUserFlag && (
              <NewUserTableRow
                onCreate={(newUser: User) => createUserMutation.mutate(newUser)}
                onCancel={() => setcreateNewUserFlag(false)}
              ></NewUserTableRow>
            )}
            {sortedList?.map((user) => (
              <UserTableRow
                key={`${user.id}`}
                user={user}
                onEdit={(updatedUser: User) =>
                  updateUserMutation.mutate({
                    id: user.id as string,
                    user: updatedUser,
                  })
                }
                onDelete={(user: User) =>
                  deleteUserMutation.mutate(user.id as string)
                }
                className="hover:bg-gray-100 cursor-pointer"
              />
            ))}
          </UserTable>
        )}
      </div>
    </div>
  );
};

export default Home;
