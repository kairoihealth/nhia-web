// mockAuth.js
const mockUsers = [
  { email: "hmo@mail.com", password: "Password@@1", role: "hmo" },
  { email: "state@mail.com", password: "Password@@1", role: "state" },
  { email: "provider@mail.com", password: "Password@@1", role: "provider" },
  { email: "central@mail.com", password: "Password@@1", role: "central" }
];

export const mockLogin = (email, password) => {
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    localStorage.setItem("userRole", user.role);
    localStorage.setItem("isAuthenticated", "true");
    return user.role;
  }

  return null; // Invalid credentials
};

export const mockLogout = () => {
  localStorage.removeItem("userRole");
  localStorage.removeItem("isAuthenticated");
};
