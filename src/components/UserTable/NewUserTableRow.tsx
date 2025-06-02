import { FC, useCallback, useMemo, useState } from "react";
import { NewUserTableRowProps } from "./UserTable.type";
import ActionButton from "../ActionButton/ActionButton";
import { User } from "../../api/UserAPI/user.type";
import { ROLE_OPTIONS } from "../../util/constants";
import classNames from "classnames";
import handleRoleColor from "../../util/handleRoleColor";

const NewUserTableRow: FC<NewUserTableRowProps> = ({ onCreate, onCancel }) => {
  const [name, setName] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [role, setRole] = useState<User["role"]>("User");

  const roleColor = useMemo(() => handleRoleColor(role), [role]);

  const resetUser = useCallback(() => {
    setName("");
    setEmail("");
    setRole("User");
  }, [name, email, role]);

  const handleCreateUser = useCallback(() => {
    onCreate({ name: name, email: email, role: role } as User);
    resetUser();
  }, [name, email, role]);

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="flex items-center px-3 py-4 text-gray-900 whitespace-nowrap dark:text-white"
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
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
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
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
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
            tooltip="Accept"
            onClick={handleCreateUser}
          ></ActionButton>
          <ActionButton
            actionType="stop"
            tooltip="Cancel"
            onClick={() => onCancel()}
          ></ActionButton>
        </div>
      </td>
    </tr>
  );
};

export default NewUserTableRow;
