import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const PrivateLayout = ({ allowedRoles }) => {
    const { user, token } = useSelector((state) => state.auth);

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-600 mb-4">403</h1>
                    <p className="text-xl text-gray-800">Access Denied</p>
                    <p className="text-gray-600">You do not have permission to view this page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar role={user.role} />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar user={user} />
                
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default PrivateLayout;
