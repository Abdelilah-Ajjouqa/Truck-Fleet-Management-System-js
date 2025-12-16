import { UserCircle } from 'lucide-react';

const Navbar = ({ user }) => {
    return (
        <header className="flex items-center justify-between h-20 px-8 bg-white border-b border-gray-200">
            {/* Welcome */}
            <div>
                <h2 className="text-xl font-bold text-black tracking-tight">
                    Overview
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    Welcome back, <span className="text-black font-medium">{user?.firstName}</span>.
                </p>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                    <p className="text-sm font-bold text-black">{user?.firstName} {user?.lastName}</p>
                    <span className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold text-white bg-black rounded-sm">
                        {user?.role}
                    </span>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 border border-gray-200">
                    <UserCircle size={24} />
                </div>
            </div>
        </header>
    );
};

export default Navbar;