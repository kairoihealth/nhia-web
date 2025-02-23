// import { useState } from "react";
// import { Helmet } from "react-helmet-async";
// import Logo from "../../../assets/nhia-logo.png";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const HmoResetPassword = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setConfirmPasswordVisible(!confirmPasswordVisible);
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Password Reset</title>
//         <meta name="Password Reset" content=" " />
//         <link rel="canonical" href="/providers-reset-password" />
//       </Helmet>
//       <div className="d-flex" style={{ backgroundColor: "#038F3E" }}>
//         <Container className="d-flex justify-content-center align-items-center">
//           <Row className="w-100 justify-content-center">
//             <Col lg={6} md={8}> 
//             <div className="card w-lg-50 w-md-75 p-4 my-5" style={{ backgroundColor: "#ffffff" }}>
//             <img
//                   src={Logo}
//                   alt="Logo"
//                   className="img mx-auto d-block"
//                 />
//                 <h4 className="accent-color text-center mt-3">Password Reset</h4>
//                 <Form>
//                   <Form.Group controlId="formEmail">
//                     <Form.Label className="mt-3">
//                       Your Password Reset Code{" "}
//                       <span className="accent-color">*</span>{" "}
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="1234"
//                       className="my-input"
//                       name="resetcode"
//                       required
//                     />
//                   </Form.Group>
//                   <Form.Group controlId="formEmail">
//                     <Form.Label className="mt-3">
//                       Email Address <span className="accent-color">*</span>{" "}
//                     </Form.Label>
//                     <Form.Control
//                       type="email"
//                       placeholder="example@example.com"
//                       className="my-input"
//                       name="email"
//                       required
//                     />
//                   </Form.Group>

//                   <Form.Group controlId="formPassword" className="position-relative">
//                 <Form.Label className="mt-3">
//                   Password <span className="accent-color">*</span>
//                 </Form.Label>
//                 <Form.Control
//                   type={passwordVisible ? "text" : "password"}
//                   name="password"
//                   className="my-input"
//                   placeholder="*************"
//                 />
//                 <span
//                   onClick={togglePasswordVisibility}
//                   className="position-absolute"
//                   style={{
//                     top: "75%",
//                     right: "10px",
//                     transform: "translateY(-50%)",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </Form.Group>

//               <Form.Group controlId="formConfirmPassword" className="position-relative">
//                 <Form.Label className="mt-3">
//                   Confirm Password <span className="accent-color">*</span>
//                 </Form.Label>
//                 <Form.Control
//                   type={confirmPasswordVisible ? "text" : "password"}
//                   name="confirmPassword"
//                   className="my-input mb-2"
//                   placeholder="*************"
//                 />
//                 <span
//                   onClick={toggleConfirmPasswordVisibility}
//                   className="position-absolute"
//                   style={{
//                     top: "75%",
//                     right: "10px",
//                     transform: "translateY(-50%)",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </Form.Group>

//                   <div
//                     className="mt-3"
//                     style={{ display: "flex", justifyContent: "center" }}
//                   >
//                     <Button
//                       className="primary-btn mt-2 mb-4"
//                     >
//                       Reset Password
//                     </Button>
//                   </div>
//                 </Form>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </>
//   );
// };

// export default HmoResetPassword;
