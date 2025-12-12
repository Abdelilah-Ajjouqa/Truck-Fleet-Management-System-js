import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../features/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import bgImage from '../../assets/auth.png';


const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [validationError, setValidationError] = useState(null);

    const dispatch = useDispatch();
    const { loading, error: reduxError, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (reduxError) dispatch(clearError());
        if (validationError) setValidationError(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setValidationError("Passwords do not match");
            return;
        }

        dispatch(register(formData));
    };

    useEffect(() => {
        if (user) {
            navigate('/dashboard', { replace: true });
        }
    }, [user, navigate]);

    const displayError = validationError || reduxError;

    return (
        <div className="flex min-h-screen bg-white">

            <div className="relative hidden w-0 flex-1 lg:block">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={bgImage}
                    alt="Logistics Fleet"
                />
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-gray-900/40 to-gray-900/20"></div>
                <div className="absolute bottom-0 left-0 p-12 text-white">
                    <h2 className="text-4xl font-bold tracking-tight">Join the Network</h2>
                    <p className="mt-4 max-w-md text-lg text-gray-300">
                        Start optimizing your routes and managing your fleet with precision today.
                    </p>
                </div>
            </div>

            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 overflow-y-auto">
                <div className="mx-auto w-full max-w-sm lg:w-96">

                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Create Account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            create an account to get started.
                        </p>
                    </div>

                    <div className="mt-10">
                        {/* 4. Error Display */}
                        {displayError && (
                            <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-600 border border-red-200">
                                {typeof displayError === 'string' ? displayError : "Registration failed"}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <div className="mt-1">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                >
                                    {loading ? 'Creating account...' : 'Register'}
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-gray-500">Already have an account?</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1">
                                <Link
                                    to="/login"
                                    className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                >
                                    Sign in instead
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;