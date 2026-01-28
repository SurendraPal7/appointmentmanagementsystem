import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, googleLogin, facebookLogin, clearError } from '../store/slices/authSlice';
import { AlertCircle, Facebook, Globe } from 'lucide-react'; // Using Globe as placeholder for Google if Chrome not preferred

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo, isLoading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            if (userInfo.role === 'patient') navigate('/patient-dashboard');
            else if (userInfo.role === 'doctor') navigate('/doctor-dashboard');
            else if (userInfo.role === 'admin') navigate('/admin-dashboard');
            else navigate('/');
        }
        return () => {
            dispatch(clearError());
        }
    }, [userInfo, navigate, dispatch]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            dispatch(login(values));
        },
    });

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl border-t-4 border-ayur-primary">
            <h2 className="text-3xl font-serif text-center mb-6 text-ayur-primary">Welcome Back</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                    <input
                        type="email"
                        {...formik.getFieldProps('email')}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-ayur-primary"
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 text-xs italic">{formik.errors.email}</div>
                    ) : null}
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        {...formik.getFieldProps('password')}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-ayur-primary"
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500 text-xs italic">{formik.errors.password}</div>
                    ) : null}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-ayur-primary hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Logging In...' : 'Login'}
                </button>
            </form>

            <div className="mt-6 flex flex-col space-y-3">
                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-sm">Or Login With</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <button
                    onClick={() => dispatch(googleLogin())}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center transition"
                >
                    <Globe className="w-5 h-5 mr-2" /> Google
                </button>
                <button
                    onClick={() => dispatch(facebookLogin())}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center transition"
                >
                    <Facebook className="w-5 h-5 mr-2" /> Facebook
                </button>
            </div>

            <div className="mt-4 text-center">
                <p className="text-gray-600 text-sm">Don't have an account? <Link to="/register" className="text-ayur-primary font-bold hover:underline">Register</Link></p>
            </div>
        </div>
    );
};

export default LoginPage;
