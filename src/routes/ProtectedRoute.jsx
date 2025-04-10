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
  const userRole = localStorage.getItem("userRole");

  if (!userRole) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the Outlet (or children) if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
