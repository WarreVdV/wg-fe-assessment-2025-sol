import { FC, useCallback, useMemo, useState } from "react";

import classNames from "classnames";

import { UserTableRowProps } from "./UserTable.type";
import { User } from "../../api/UserAPI/user.type";
import { ROLE_OPTIONS } from "../../util/constants";

import ActionButton from "../ActionButton/ActionButton";
import handleRoleColor from "../../util/handleRoleColor";

const UserTableRow: FC<UserTableRowProps> = ({
  className,
  user,
  onEdit,
  onDelete,
  onClick,
}) => {
  const [name, setName] = useState<String>(user.name || "");
  const [email, setEmail] = useState<String>(user.email || "");
  const [role, setRole] = useState<User["role"]>(user.role || "");
  const [editMode, setEditMode] = useState<boolean>(false);

  const roleColor = useMemo(() => handleRoleColor(role), [role]);

  const resetUser = useCallback(() => {
    setName(user.name || "");
    setEmail(user.email || "");
    setRole(user.role || "");
    setEditMode(false);
  }, [user]);

  // Handle patch request to update user
  const handlePatch = useCallback(() => {
    if (onEdit) {
      const updatedUser = { name: name, email: email, role: role } as User;
      onEdit(updatedUser);
    }
    setEditMode(false);
  }, [onEdit, user]);

  // Handle delete request to remove user
  const handleDelete = useCallback(() => {
    if (onDelete) {
      onDelete(user);
    }
    setEditMode(false);
  }, [onDelete, user]);

  // Handle close action to reset user and exit edit mode
  const handleClose = useCallback(() => {
    resetUser();
    setEditMode(false);
  }, [resetUser]);

  if (editMode) {
    return (
      <tr
        className={classNames(
          className,
          "bg-white border-b border-gray-200 hover:bg-gray-50"
        )}
      >
        <th
          scope="row"
          className="flex items-center px-3 py-4 text-gray-900 whitespace-nowrap"
        >
          <div
            className={classNames(
              roleColor,
              "w-10 h-10 rounded-full flex justify-center items-center"
            )}
          >
            <span className="mx-auto text-white font-extrabold">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ps-3">
            <div className="flex space-x-1">
              {/**Normally, a form with validation would be preferable. But due to time constraints and component simplicity, I went for a custom solution */}
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  First name
                </label>
                <input
                  id="first_name"
                  type="text"
                  required
                  placeholder="Write a full name here"
                  value={name as string}
                  onChange={(e) => setName(e.target.value)}
                  className="text-base"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Enter a valid email address"
                  value={email as string}
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-normal text-gray-500 px-1"
                />
              </div>
            </div>
          </div>
        </th>
        <td className="px-6 py-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as User["role"])}
          >
            {ROLE_OPTIONS.map((roleOption) => (
              <option value={roleOption}>{roleOption}</option>
            ))}
          </select>
        </td>
        <td className="min-w-48">
          <div className="flex space-x-2">
            <ActionButton
              actionType="accept"
              onClick={handlePatch}
            ></ActionButton>
            <ActionButton
              actionType="stop"
              onClick={handleClose}
            ></ActionButton>
            <ActionButton
              actionType="delete"
              onClick={handleDelete}
            ></ActionButton>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr
      className={classNames(
        "bg-white border-b  border-gray-200 hover:bg-gray-50 ",
        onClick && "cursor-pointer"
      )}
    >
      <th
        scope="row"
        className="flex items-center px-3 py-4 text-gray-900 whitespace-nowrap"
        onClick={() => onClick && onClick(user)}
      >
        <div
          className={classNames(
            roleColor,
            "w-10 h-10  rounded-full flex justify-center items-center"
          )}
        >
          <span className="mx-auto text-white font-extrabold">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="ps-3">
          <div className="text-base font-semibold">{name}</div>
          <div className="font-normal text-gray-500">{email}</div>
        </div>
      </th>
      <td onClick={() => onClick && onClick(user)} className="px-6 py-4">
        <div className={classNames(roleColor, "w-fit py-1 px-2 rounded-2xl")}>
          {role}
        </div>
      </td>
      <td className="w-1 whitespace-nowrap pr-10">
        <ActionButton
          actionType="edit"
          onClick={() => setEditMode(true)}
        ></ActionButton>
      </td>
    </tr>
  );
};

export default UserTableRow;
