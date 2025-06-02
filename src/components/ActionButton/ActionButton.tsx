import { FC, useMemo } from "react";
import { ActionButtonProps } from "./ActionButton.type";
import {
  IoAddOutline,
  IoCheckmark,
  IoClose,
  IoPencil,
  IoTrashBin,
} from "react-icons/io5";
import classNames from "classnames";

const ActionButton: FC<ActionButtonProps> = ({
  actionType,
  onClick,
  text,
  tooltip,
  submit = false,
}) => {
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
      {/* Tooltip */}
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
      {/* Tooltip */}
      {tooltip && (
        <div
          id="tooltip-light"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 tooltip"
        >
          {tooltip}
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      )}
    </div>
  );
};

export default ActionButton;
