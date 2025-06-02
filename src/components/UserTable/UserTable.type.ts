import { User } from "../../api/UserAPI/user.type";

export interface UserTableProps {
  className?: String;
  children: React.ReactNode;
}

export interface UserTableRowProps {
  className?: String;
  user: User;
  onClick?: (user: User) => void;
  onDelete?: (user: User) => void;
  onEdit?: (user: User) => void;
}

export interface NewUserTableRowProps {
  className?: String;
  onCreate: (user: User) => void;
  onCancel: () => void;
}
