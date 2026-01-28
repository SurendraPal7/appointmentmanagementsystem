import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, googleLogin, facebookLogin, clearError } from '../store/slices/authSlice';
import { AlertCircle, CheckCircle, Globe, Facebook } from 'lucide-react';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo, isLoading, error, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            // If just registered (and likely needs verification), we might not want to redirect immediately if we want to show the message
            // But typically Firebase logs them in automatically.
            // Let's redirect to dashboard, but dashboard should show verification warning if needed.
            const timer = setTimeout(() => {
                navigate('/patient-dashboard');
            }, 2000); // Small delay to see success message
            return () => clearTimeout(timer);
        }
        return () => {
            dispatch(clearError());
        }
    }, [userInfo, navigate, dispatch]);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            phone: Yup.string().required('Required'),
            password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Required'),
        }),
        onSubmit: (values) => {
            // Default role is patient
            dispatch(register({ name: values.name, email: values.email, password: values.password, phone: values.phone }));
        },
    });

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl border-t-4 border-ayur-primary">
            <h2 className="text-3xl font-serif text-center mb-6 text-ayur-primary">Create Account</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span>{error}</span>
                </div>
            )}

            {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>{message} Please check your email.</span>
                </div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                    <input
                        type="text"
                        {...formik.getFieldProps('name')}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-ayur-primary"
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500 text-xs italic">{formik.errors.name}</div>
                    ) : null}
                </div>

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
                    <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                    <input
                        type="text"
                        {...formik.getFieldProps('phone')}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-ayur-primary"
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className="text-red-500 text-xs italic">{formik.errors.phone}</div>
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

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                    <input
                        type="password"
                        {...formik.getFieldProps('confirmPassword')}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-ayur-primary"
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div className="text-red-500 text-xs italic">{formik.errors.confirmPassword}</div>
                    ) : null}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-ayur-primary hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>

            <div className="mt-6 flex flex-col space-y-3">
                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-sm">Or Register With</span>
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
                <p className="text-gray-600 text-sm">Already have an account? <Link to="/login" className="text-ayur-primary font-bold hover:underline">Login</Link></p>
            </div>
        </div>
    );
};

export default RegisterPage;
