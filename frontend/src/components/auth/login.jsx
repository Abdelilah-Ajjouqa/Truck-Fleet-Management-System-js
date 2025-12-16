import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../features/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import bgImage from '../../assets/auth.png';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) dispatch(clearError());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
    };

    useEffect(() => {
        if (user) {
            navigate('/dashboard', { replace: true });
        }
    }, [user, navigate]);

    return (
        <div className="flex min-h-screen bg-white">

            <div className="relative hidden w-0 flex-1 lg:block">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={bgImage}
                    alt="Global Logistics Fleet"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-900/90 via-zinc-900/40 to-zinc-900/20"></div>
                <div className="absolute bottom-0 left-0 p-12 text-white">
                    <h2 className="text-4xl font-bold tracking-tight">Global Logistics Solutions</h2>
                    <p className="mt-4 max-w-md text-lg text-zinc-300">
                        Automating the future of fleet management. Track, Optimize, Deliver.
                    </p>
                </div>
            </div>

            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">

                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-sm text-zinc-600">
                            Please enter your credentials to get access.
                        </p>
                    </div>

                    <div className="mt-10">
                        {/* Error Display */}
                        {error && (
                            <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-600 border border-red-200">
                                {typeof error === 'string' ? error : "Login failed. Check your credentials."}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border border-zinc-300 px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm transition-colors"
                                        placeholder="user@logistics.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border border-zinc-300 px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 transition-all ${
                                        loading ? 'bg-zinc-600 cursor-wait' : 'bg-black hover:bg-zinc-800'
                                    }`}
                                >
                                    {loading ? 'Authenticating...' : 'Sign in'}
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-zinc-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-zinc-500">New to the platform?</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1">
                                <Link
                                    to="/register"
                                    className="flex w-full justify-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors"
                                >
                                    Register Company Account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;