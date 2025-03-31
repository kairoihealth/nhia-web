// import { Route, Redirect } from "react-router-dom";
// import PropTypes from "prop-types";

// const getUserRole = () => localStorage.getItem("userRole");

// const ProtectedRoute = ({ children, ...rest }) => {
//   const userRole = getUserRole();

//   return (
//     <Route
//       {...rest}
//       render={() => (userRole ? children : <Redirect to="/login" />)}
//     />
//   );
// };

// ProtectedRoute.propTypes = {
//   children: PropTypes.node.isRequired
// };

// export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
