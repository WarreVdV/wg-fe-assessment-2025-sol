import { FC } from "react";
import { IoChevronDown } from "react-icons/io5";

interface ChevronProps {
  direction: "asc" | "desc";
}
const Chevron: FC<ChevronProps> = ({ direction }) => {
  return (
    <span>
      {direction === "asc" ? (
        <IoChevronDown className="rotate-180"></IoChevronDown>
      ) : (
        <IoChevronDown></IoChevronDown>
      )}
    </span>
  );
};

export default Chevron;
