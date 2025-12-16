import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Truck, Container, Map, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ role }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isActive = (path) => {
        return location.pathname === path 
            ? "bg-white text-black shadow-lg shadow-gray-900/20 font-bold"
            : "text-gray-400 hover:bg-zinc-800 hover:text-white";
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="flex flex-col w-64 h-screen bg-zinc-950 text-white transition-all duration-300 border-r border-zinc-800">
            
            <div className="flex items-center justify-center h-20 border-b border-zinc-800">
                <h1 className="text-2xl font-black tracking-wider text-white">
                    FLEET<span className="text-zinc-500">MANAGER</span>
                </h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col gap-2 p-4">
                
                <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive('/dashboard')}`}>
                    <LayoutDashboard size={20} />
                    <span className="text-sm tracking-wide">Dashboard</span>
                </Link>

                {role === 'ADMIN' && (
                    <>
                        <Link to="/trucks" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive('/trucks')}`}>
                            <Truck size={20} />
                            <span className="text-sm tracking-wide">Trucks</span>
                        </Link>

                        <Link to="/trailers" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive('/trailers')}`}>
                            <Container size={20} />
                            <span className="text-sm tracking-wide">Trailers</span>
                        </Link>
                    </>
                )}

                <Link to="/trips" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive('/trips')}`}>
                    <Map size={20} />
                    <span className="text-sm tracking-wide">My Trips</span>
                </Link>

            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-zinc-800">
                <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white hover:text-black rounded-lg transition-all duration-200 group"
                >
                    <LogOut size={20} className="group-hover:text-red-600 transition-colors" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;