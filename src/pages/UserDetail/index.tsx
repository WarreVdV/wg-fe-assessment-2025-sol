import { IoPersonCircleOutline } from "react-icons/io5";
import { FC, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import classNames from "classnames";

import { getUsersById } from "../../api/UserAPI";

import handleRoleColor from "../../util/handleRoleColor";
import Spinner from "../../layout/Spinner/Spinner";

const UserDetail: FC = () => {
  const { id: userID } = useParams();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", userID],
    queryFn: () => getUsersById(userID as string),
    enabled: !!userID, // Only run the query if userID is defined
  });

  useEffect(() => {
    console.log("User ID from URL:", userID);
  }, [userID]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner></Spinner>
      </div>
    );
  }

  if (error) {
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-red-500">
        Error fetching user data: {error.message}
      </h1>
    </div>;
  }

  return (
    <div className="flex flex-col justify-center items-center space-y-10">
      {user ? (
        <>
          <div
            className={classNames(
              "flex justify-center items-center mb-4 rounded-full",
              handleRoleColor(user.role)
            )}
          >
            <IoPersonCircleOutline className="text-white text-5xl"></IoPersonCircleOutline>
          </div>
          <h1 className="text-3xl font-bold mb-4">
            {`Welcome back, ${user?.name}`} 👋
          </h1>
          <p
            className={classNames(
              handleRoleColor(user.role),
              "px-2 py-1 rounded-2xl mt-5"
            )}
          >
            {user.role}
          </p>
          <p className="text-gray-700">Email: {user.email}</p>
        </>
      ) : (
        <p className="text-red-500">User not found</p>
      )}
    </div>
  );
};
export default UserDetail;
