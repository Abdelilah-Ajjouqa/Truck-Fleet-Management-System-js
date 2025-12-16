import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrailers, deleteTrailer } from '../../features/trailerSlice';
import { Plus, Trash2, Edit, Container } from 'lucide-react';
import TrailerModal from './TrailerModal';

const TrailerList = () => {
    const dispatch = useDispatch();
    const { trailers, isLoading, isError, message } = useSelector((state) => state.trailers);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrailer, setSelectedTrailer] = useState(null);

    useEffect(() => {
        dispatch(getTrailers());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Delete this trailer?')) {
            dispatch(deleteTrailer(id));
        }
    };

    const openAddModal = () => {
        setSelectedTrailer(null);
        setIsModalOpen(true);
    };

    const openEditModal = (trailer) => {
        setSelectedTrailer(trailer);
        setIsModalOpen(true);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'AVAILABLE': return 'bg-green-100 text-green-800 border-green-200';
            case 'IN_TRANSIT': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'MAINTENANCE': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTireColor = (condition) => {
        return condition === 'CRITICAL' ? 'text-red-600 font-bold' : 'text-gray-600';
    };

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading assets...</div>;
    if (isError) return <div className="p-8 text-center text-red-500">Error: {message}</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Container className="w-8 h-8" />
                        Trailer Fleet
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Manage trailers and equipment status.</p>
                </div>

                <button onClick={openAddModal} className="flex items-center gap-2 bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-lg transition-colors shadow-lg">
                    <Plus size={20} />
                    <span>Add New Trailer</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500">
                            <tr>
                                <th className="px-6 py-4">Matricule</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Tires</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {trailers.length > 0 ? (
                                trailers.map((trailer) => (
                                    <tr key={trailer._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{trailer.matricule}</td>
                                        <td className="px-6 py-4">{trailer.type}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(trailer.status)}`}>
                                                {trailer.status}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 ${getTireColor(trailer.tireCondition)}`}>
                                            {trailer.tireCondition}
                                        </td>
                                        <td className="px-6 py-4 flex justify-center gap-3">
                                            <button onClick={() => openEditModal(trailer)} className="text-gray-400 hover:text-blue-600 transition-colors">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(trailer._id)} className="text-gray-400 hover:text-red-600 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                        No trailers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <TrailerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                trailerToEdit={selectedTrailer}
            />
        </div>
    );
};

export default TrailerList;