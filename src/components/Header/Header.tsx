import { FC } from "react";
import { IoHome } from "react-icons/io5";
import { HeaderProps } from "./Header.type";

const Header: FC<HeaderProps> = ({ title, subtitle, onHome }) => {
  return (
    <header className="bg-slate-100 text-slate-600 px-10 py-4">
      <div className="flex items-center space-x-10">
        <button>
          <IoHome className="text-3xl" onClick={onHome}></IoHome>
        </button>
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && <p className="text-sm">{subtitle}</p>}
        </div>
      </div>
    </header>
  );
};
export default Header;
