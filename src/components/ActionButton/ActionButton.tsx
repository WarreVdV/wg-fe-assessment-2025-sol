import { FC, useMemo } from "react";
import {
  IoAddOutline,
  IoCheckmark,
  IoClose,
  IoPencil,
  IoTrashBin,
} from "react-icons/io5";

import classNames from "classnames";

import { ActionButtonProps } from "./ActionButton.type";

const ActionButton: FC<ActionButtonProps> = ({
  actionType,
  onClick,
  text,
  submit = false,
}) => {
  // Memoize the button style and icon based on the action type
  const buttonStyle = useMemo(() => {
    switch (actionType) {
      case "add":
        return {
          style: "hover:!text-blue-500",
          icon: (
            <IoAddOutline className="text-slate-500 hover:!text-blue-500 text-xl" />
          ),
        };
      case "accept":
        return {
          style: "hover:!text-green-500",
          icon: (
            <IoCheckmark className="text-slate-500 hover:!text-green-500 text-2xl" />
          ),
        };
      case "stop":
        return {
          style: "hover:!text-yellow-500",
          icon: (
            <IoClose className="text-slate-500 hover:!text-yellow-500 text-2xl" />
          ),
        };
      case "edit":
        return {
          style: "hover:!text-slate-500",
          icon: (
            <IoPencil className="text-slate-500 hover:!text-slate-900 text-xl" />
          ),
        };
      case "delete":
        return {
          style: "hover:!text-red-500 ",
          icon: (
            <IoTrashBin className="text-slate-500 hover:!text-red-500 text-2xl" />
          ),
        };
      default:
        return {
          style: "hover:!text-gray-500",
          icon: null,
        };
    }
  }, [actionType]);

  return (
    <div>
      <button
        data-tooltip-target="tooltip-light"
        type={submit ? "submit" : "button"}
        onClick={onClick}
        className={classNames(
          "!bg-transparent !rounded-full flex space-x-2",
          buttonStyle.style
        )}
      >
        {buttonStyle.icon}
        {text && <span className="ml-2">{text}</span>}
      </button>
    </div>
  );
};

export default ActionButton;
