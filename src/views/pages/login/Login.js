import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { ToastContainer, toast } from "react-toastify";
import useApi from "../../../hooks/useApi";
import { endpoints } from "../../../defaults";
import AuthContext from "../../../contexts/authContext";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const { request: login } = useApi("post");

  const navigate = useNavigate();

  
  const { setCurrentUser, loggoff } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters")
      .required("Required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const apiResponse = await login(endpoints.LOGIN, values);
    const { response, error } = apiResponse;
    if (response && response.data) {
      const { data: apiData } = response;
      setCurrentUser(apiData.data); 
      navigate("/");
    } else {
      const { response: errRes } = error;
      const errorMessage =
        errRes?.data?.message || "Error Occurred. Please contact Admin !!";
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <Formik
                      initialValues={{ email: "", password: "" }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      <Form>
                        <h1>Login</h1>
                        <p className="text-body-secondary">
                          Sign In to your account
                        </p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <Field
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="Email"
                          />
                        </CInputGroup>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger mb-3"
                        />

                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <Field
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Password"
                          />
                        </CInputGroup>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger mb-4"
                        />

                        <CRow>
                          <CCol xs={6}>
                            <CButton
                              color="primary"
                              className="px-4"
                              type="submit"
                              disabled={loading}
                            >
                              Login
                            </CButton>
                          </CCol>
                          <CCol xs={6} className="text-right">
                            <CButton color="link" className="px-0">
                              Forgot password?
                            </CButton>
                          </CCol>
                        </CRow>
                      </Form>
                    </Formik>
                  </CCardBody>
                </CCard>
                <CCard
                  className="text-white bg-primary py-5"
                  style={{ width: "44%" }}
                >
                  <CCardBody className="text-center">
                    {/* <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div> */}
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
