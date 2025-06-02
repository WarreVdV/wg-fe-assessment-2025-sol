import { FC } from "react";
import { UserTableProps } from "./UserTable.type";

export const UserTable: FC<UserTableProps> = ({ children }) => {
  return (
    <div>
      <div className="h-full relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="sticky top-0 w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="mx-auto">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
};
