// // import { Helmet } from "react-helmet-async";
// import Logo from "../../../assets/nhia-logo.png";
// import KairoiLogo from "../../../assets/kairoi-logo.png";
// import { Form, Row, Col, Button } from "react-bootstrap";
// import { FiArrowLeft } from "react-icons/fi";

// const ReviewForm = () => {
//   return (
//     <>
//       {/* <Helmet>
//         <title>Complaint Review</title>
//         <meta name="Complaint Review" content=" " />
//         <link rel="canonical" href="/" />
//       </Helmet> */}
//       <Row className="m-0 p-0 main">
//         <Col
//           style={{
//             backgroundColor: "#038F3E",
//             color: "#fff",
//           }}
//         >
//           <div
//             className="d-flex flex-column justify-content-between p-5"
//             style={{ minHeight: "100vh" }}
//           >
//             <div>
//               <img src={Logo} alt="Logo" className="img" />
//             </div>
//             <div>
//               <h1 className="mt-5">
//                 Welcome to NHIA Complaint Management System
//               </h1>
//               <p className="mt-3">
//                 Welcome aboard! Your complaints fuel our quest for service
//                 perfection.
//               </p>
//             </div>
//             <div className="d-flex justify-content-between mt-5">
//               <span></span>
//               <span className="d-flex">
//                 <p>Powered by</p>
//                 <img src={KairoiLogo} alt="KairoiLogo" className="" />
//               </span>
//             </div>
//           </div>
//         </Col>
//         <Col className="d-flex flex-column justify-content-between py-4 h-100">
//           <div>
//             <a href="/enrolees-welcome-page" className="accent-color"> <FiArrowLeft className="mx-2" />
//               Back
//             </a>
//             <h4
//               className="accent-color mx-3 mt-5"
//               style={{ textAlign: "left" }}
//             >
//               Review of existing complaint or request
//             </h4>
//             <p className="secondary-color mx-3">
//               Track and manage your coplaints on the Kairoi CMS platform at your
//               fingertips.
//             </p>
//             <div className="d-flex">
//               <div className="card w-100 mx-3 p-2 my-4">
//                 <Form.Group controlId="formComplaintNumber">
//                   <Form.Label className="">
//                     Input your complaint number to get an update
//                   </Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="ENF-"
//                     className=""
//                     required
//                   />
//                 </Form.Group>
//                 <p className="mt-2">Sample: ENF-HMO/26/211024/1</p>
//               </div>
//             </div>
//             <div className="d-flex justify-content-center">
//               <Button className="primary-btn mt-3 w-50" href="/">
//                 Review Status
//               </Button>
//             </div>
//           </div>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default ReviewForm;
