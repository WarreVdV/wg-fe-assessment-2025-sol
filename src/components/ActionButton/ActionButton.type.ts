export interface ActionButtonProps {
  actionType: "add" | "accept" | "stop" | "edit" | "delete";
  submit?: boolean;
  onClick?: () => void;
  text?: string;
  className?: string;
  disabled?: boolean;
}
