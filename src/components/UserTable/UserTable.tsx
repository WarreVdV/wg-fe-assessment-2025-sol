import { FC } from "react";

import { UserTableProps } from "./UserTable.type";
import { User } from "../../api/UserAPI/user.type";

import Chevron from "../../layout/Chevron/Chevron";
import classNames from "classnames";

const COLUMNS = ["Name", "Role"];

export const UserTable: FC<UserTableProps> = ({
  className,
  children,
  onHeaderClick,
  activeSort,
}) => {
  return (
    <div>
      <div
        className={classNames(
          className,
          "h-full relative overflow-x-auto shadow-md sm:rounded-lg"
        )}
      >
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="sticky top-0 w-full text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  onClick={
                    onHeaderClick
                      ? () => onHeaderClick(col.toLowerCase() as keyof User)
                      : undefined
                  }
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                >
                  <div className="flex">
                    <span className="pr-3">{col}</span>
                    {activeSort && activeSort.key === col.toLowerCase() ? (
                      <Chevron direction={activeSort.direction} />
                    ) : null}
                  </div>
                </th>
              ))}
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
