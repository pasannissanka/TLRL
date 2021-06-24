import axios from 'axios';
import { ErrorMessage, Field, Formik } from 'formik';
import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import * as yup from 'yup';

interface LoginProps {}

export const Login = (props: LoginProps) => {
  const history = useHistory();

  const loginValidationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid Email')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password should be of minimum 6 characters')
      .required('Password is required'),
  });

  return (
    <React.Fragment>
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="grid place-items-center mx-2 my-20 sm:my-auto">
          <div className="container mx-auto max-w-md w-full">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <Formik
              initialValues={{ email: '', password: '', rememberMe: false }}
              validationSchema={loginValidationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                axios
                  .post('http://localhost:4000/auth/login', {
                    email: values.email,
                    password: values.password,
                  })
                  .then((result) => {
                    const data = result.data;
                    setSubmitting(false);
                    if (
                      result.status === 200 &&
                      data.data.token &&
                      data.data.userId
                    ) {
                      localStorage.setItem('token', data.data.token);
                      localStorage.setItem('userId', data.data.userId);
                      history.push('/');
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              {({
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div className="rounded-md shadow-sm ">
                    <div>
                      <Field
                        className={`appearance-none rounded-md relative block w-full my-2
										px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
										focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                        name="email"
                        type="email"
                        placeholder="Email"
                      />
                      <ErrorMessage name="email" />
                    </div>
                    <div>
                      <Field
                        className={`appearance-none rounded-md relative block w-full px-3 py-2 my-2
										border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none
										focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                        name="password"
                        type="password"
                        placeholder="Password"
                      />
                      <ErrorMessage name="password" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember_me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <RouterLink
                        to="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </RouterLink>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className={`group relative w-full flex justify-center py-2 px-4 border
											border-transparent text-sm font-medium rounded-md text-white bg-indigo-600
											hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                      {!isSubmitting ? (
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <svg
                            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </span>
                      )}
                      Sign in
                    </button>
                  </div>
                  <div>
                    <div className="flex items-center justify-end">
                      <div className="text-sm">
                        <RouterLink
                          to="/register"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Don't have an account? Sign Up
                        </RouterLink>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
