export const getFullName = (user) => {
  if (!user) return "";
  return `${user.firstName || ""} ${user.lastName || ""}`.trim();
};

export const getUserRole = (role) => {
  const reles = {
    super_admin: "Super Admin",
    doctor: "Doctor",
    receptionist: "Receptionist",
  };

  return reles[role] || "";
};
