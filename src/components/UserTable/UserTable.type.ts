import { User } from "../../api/UserAPI/user.type";

type sortDirection = "asc" | "desc";

export interface UserTableProps {
  className?: String;
  onHeaderClick?: (key: keyof User) => void;
  activeSort?: {
    key: String;
    direction: sortDirection;
  };
  children: React.ReactNode;
}

export interface UserTableRowProps {
  className?: String;
  user: User;
  onClick?: (user: User | undefined) => void;
  onDelete?: (user: User) => void;
  onEdit?: (user: User) => void;
}

export interface NewUserTableRowProps {
  className?: String;
  onCreate: (user: User) => void;
  onCancel: () => void;
}
