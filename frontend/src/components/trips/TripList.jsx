import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrips, deleteTrip, updateTripStatus } from '../../features/tripSlice';
import { Map, Plus, Trash2, Truck, User, Calendar, Play, CheckSquare } from 'lucide-react';
import TripModal from './TripModal';
import CompleteTripModal from './CompleteTripModal';

const TripList = () => {
    const dispatch = useDispatch();
    
    const { trips, isLoading, isError, message } = useSelector((state) => state.trips);
    const { user } = useSelector((state) => state.auth);
    
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);

    useEffect(() => {
        dispatch(getTrips());
    }, [dispatch]);

    // Admin: Delete
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to cancel this mission?')) {
            dispatch(deleteTrip(id));
        }
    };

    // Driver: Start Trip
    const handleStartTrip = async (id) => {
        if(window.confirm('Start this mission now? Status will change to IN PROGRESS.')) {
            try {
                // 1. Update the status and wait for completion
                await dispatch(updateTripStatus({ id, data: { status: 'IN_PROGRESS' } })).unwrap();
                // 2. Refresh the list to get updated data
                await dispatch(getTrips()).unwrap();
            } catch (error) {
                console.error('Failed to start trip:', error);
                alert('Failed to start mission. Please try again.');
            }
        }
    };

    // Driver: Open Complete Modal
    const openCompleteModal = (trip) => {
        setSelectedTrip(trip);
        setIsCompleteModalOpen(true);
    };

    // Helper: Badge Colors
    const getStatusStyle = (status) => {
        switch (status) {
            case 'PLANNED': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800 border-yellow-200 animate-pulse';
            case 'COMPLETED': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading missions...</div>;
    if (isError) return <div className="p-8 text-center text-red-500">Error: {message}</div>;

    return (
        <div className="space-y-6">
            
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Map className="w-8 h-8" />
                        Mission Control
                    </h1>
                    <p className="text-gray-500 text-sm">
                        {user.role === 'ADMIN' ? 'Manage fleet schedules.' : 'My assigned missions.'}
                    </p>
                </div>
                
                {user.role === 'ADMIN' && (
                    <button 
                        onClick={() => setIsCreateModalOpen(true)} 
                        className="flex items-center gap-2 bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-lg transition-colors shadow-lg"
                    >
                        <Plus size={20} />
                        <span>Plan New Mission</span>
                    </button>
                )}
            </div>

            {/* List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips && trips.length > 0 ? (
                    trips.map((trip) => (
                        <div key={trip._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
                            
                            {/* Route & Status */}
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900">
                                        {trip.departure} <span className="text-gray-400">→</span> {trip.destination}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wide mt-1">
                                        <Calendar size={14} />
                                        {new Date(trip.startDate).toLocaleDateString()}
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-md text-xs font-bold border ${getStatusStyle(trip.status)}`}>
                                    {trip.status}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="space-y-3 text-sm text-gray-600 mb-6 bg-gray-50 p-3 rounded-lg flex-grow">
                                <div className="flex items-center gap-3">
                                    <Truck size={16} className="text-gray-400" />
                                    <span className="font-medium">
                                        {trip.truck ? trip.truck.matricule : <span className="text-red-400">Unassigned</span>}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <User size={16} className="text-gray-400" />
                                    <span className="font-medium">
                                        {trip.driver ? `${trip.driver.firstName} ${trip.driver.lastName}` : <span className="text-red-400">Unassigned</span>}
                                    </span>
                                </div>
                            </div>

                            {/* BUTTONS AREA */}
                            <div className="pt-4 border-t border-gray-100 mt-auto">
                                
                                {user.role === 'DRIVER' && trip.status === 'PLANNED' && (
                                    <button 
                                        onClick={() => handleStartTrip(trip._id)}
                                        className="w-full py-2 bg-black hover:bg-zinc-800 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
                                    >
                                        <Play size={16} /> Start Mission
                                    </button>
                                )}

                                {user.role === 'DRIVER' && trip.status === 'IN_PROGRESS' && (
                                    <button 
                                        onClick={() => openCompleteModal(trip)}
                                        className="w-full py-2 bg-black hover:bg-zinc-800 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
                                    >
                                        <CheckSquare size={16} /> Complete Mission
                                    </button>
                                )}

                                {user.role === 'ADMIN' && (
                                    <button 
                                        onClick={() => handleDelete(trip._id)}
                                        className="w-full py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Trash2 size={16} /> Cancel Mission
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <Map className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                        <h3 className="text-sm font-medium text-gray-900">No missions found</h3>
                        <p className="text-sm text-gray-500">Plan a new trip to get started.</p>
                    </div>
                )}
            </div>

            {/* Modals */}
            <TripModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)} 
            />
            
            <CompleteTripModal 
                isOpen={isCompleteModalOpen} 
                onClose={() => {
                    setIsCompleteModalOpen(false);
                    dispatch(getTrips());
                }}
                trip={selectedTrip}
            />
        </div>
    );
};

export default TripList;