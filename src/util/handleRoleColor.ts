const handleRoleColor = (role: String) => {
  if (role === "Admin") {
    return "bg-adminbg text-admin";
  }

  return "bg-userbg text-user";
};

export default handleRoleColor;
