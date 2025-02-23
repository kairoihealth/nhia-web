import admin from "../assets/admin-icon.png";
export const hmoAdmin = [
  {
    id: 1,
    role: "Admin I",
    firstname: "Oyinkansola",
    lastname: "Ade",
    middlename: "",
    email: "ade.oyinkansola@gmail.com",
    designation: "Complaints Manager",
    icon: admin
  },
  {
    id: 2,
    role: "Admin I",
    firstname: "Oyinkansola",
    lastname: "Ade",
    middlename: "Mathias",
    email: "ade.oyinkansola@gmail.com",
    designation: "Complaints Manager",
    icon: admin
  }
];

export const hmoAdminLevel = [
  {
    id: 1,
    title: "Admin I",
    permissions: [1, 2, 3, 4, 5, 6]
  },
  {
    id: 2,
    title: "Admin II",
    permissions: [1, 2, 3, 4, 5]
  },
  {
    id: 3,
    title: "Admin III",
    permissions: [1, 2, 3]
  }
];

export const hmoAdminLevelPermissions = [
  {
    id: 1,
    title: "View all complaints",
    description:
      "Admins have access to a comprehensive view of all complaints submitted within the system, regardless of status (open, pending, resolved, closed)"
  },
  {
    id: 2,
    title: "View complaint details",
    description: "View details of the complaints"
  },
  {
    id: 3,
    title: "Manage complaint resolution workflow",
    description:
      "Admins might be able to configure the complaint resolution workflow, defining stages and assigning actions associated with each stage."
  },
  {
    id: 4,
    title: "Access advanced reporting",
    description:
      "Admins can access detailed reports on complaint volume, resolution times and customer satisfaction."
  },
  {
    id: 5,
    title: "Export complaint data",
    description:
      "Allow admins to export complaint data in various formats (e.g., CSV, Excel) for further analysis or sharing with relevant stakeholders."
  },
  {
    id: 6,
    title: "Manage complaint categories",
    description:
      "Admins can add, edit, or delete complaint categories used for classifying incoming complaints."
  }
];
