import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrucks, deleteTruck } from '../../features/truckSlice';
import { Plus, Trash2, Edit, Truck as TruckIcon } from 'lucide-react';
import TruckModal from './TruckModal';

const TruckList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTruck, setSelectedTruck] = useState(null);
    const dispatch = useDispatch();
    const { trucks, isLoading, isError, message } = useSelector((state) => state.trucks);

    useEffect(() => {
        dispatch(getTrucks());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this truck?')) {
            dispatch(deleteTruck(id));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'AVAILABLE': return 'bg-green-100 text-green-800 border-green-200';
            case 'IN_TRANSIT': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'MAINTENANCE': return 'bg-red-100 text-red-800 border-red-200';
            case 'RESERVED': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const openAddModal = () => {
        setSelectedTruck(null);
        setIsModalOpen(true);
    };

    const openEditModal = (truck) => {
        setSelectedTruck(truck);
        setIsModalOpen(true);
    };

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading fleet data...</div>;
    if (isError) return <div className="p-8 text-center text-red-500">Error: {message}</div>;

    return (
        <div className="space-y-6">

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <TruckIcon className="w-8 h-8" />
                        Fleet Management
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your trucks, mileage, and maintenance status.</p>
                </div>

                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-lg transition-colors shadow-lg"
                >
                    <Plus size={20} />
                    <span>Add New Truck</span>
                </button>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500">
                            <tr>
                                <th className="px-6 py-4">Matricule</th>
                                <th className="px-6 py-4">Model</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Mileage</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {trucks.length > 0 ? (
                                trucks.map((truck) => (
                                    <tr key={truck._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{truck.matricule}</td>
                                        <td className="px-6 py-4">{truck.model}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(truck.status)}`}>
                                                {truck.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-mono">{truck.currentMileage.toLocaleString()} km</td>
                                        <td className="px-6 py-4 flex justify-center gap-3">
                                            <button
                                                onClick={() => openEditModal(truck)}
                                                className="text-gray-400 hover:text-blue-600 transition-colors">
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(truck._id)}
                                                className="text-gray-400 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                        No trucks found. Add one to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <TruckModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                truckToEdit={selectedTruck}
            />
        </div>
    );
};

export default TruckList;