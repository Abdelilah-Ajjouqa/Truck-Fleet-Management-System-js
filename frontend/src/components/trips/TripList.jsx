import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrips, deleteTrip } from '../../features/tripSlice';
import { Map, Calendar, Navigation, Truck, User } from 'lucide-react';
// import { format } from 'date-fns';

const TripList = () => {
    const dispatch = useDispatch();
    
    const { trips, isLoading, isError, message } = useSelector((state) => state.trips);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getTrips());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to cancel this trip?')) {
            dispatch(deleteTrip(id));
        }
    };

    // Helper: Badge Colors
    const getStatusStyle = (status) => {
        switch (status) {
            case 'PLANNED': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'COMPLETED': return 'bg-green-100 text-green-700 border-green-200';
            case 'CANCELLED': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading mission data...</div>;
    if (isError) return <div className="p-8 text-center text-red-500">Error: {message}</div>;

    return (
        <div className="space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Map className="w-8 h-8" />
                        {user.role === 'ADMIN' ? 'All Missions' : 'My Road Map'}
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {user.role === 'ADMIN' ? 'Monitor fleet movement and assignments.' : 'View your assigned schedules and routes.'}
                    </p>
                </div>
                
                {/* Only Admins can Create Trips */}
                {user.role === 'ADMIN' && (
                    <button className="flex items-center gap-2 bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-lg transition-colors shadow-lg">
                        <Navigation size={20} />
                        <span>Plan New Trip</span>
                    </button>
                )}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.length > 0 ? (
                    trips.map((trip) => (
                        <div key={trip._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900">{trip.departure} <span className="text-gray-400">→</span> {trip.arrival}</h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">
                                        {new Date(trip.startDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className={`px-2 py-1 rounded-md text-xs font-bold border ${getStatusStyle(trip.status)}`}>
                                    {trip.status}
                                </span>
                            </div>

                            {/* Trip Details */}
                            <div className="space-y-3 text-sm text-gray-600 mb-6">
                                <div className="flex items-center gap-3">
                                    <Truck size={16} className="text-gray-400" />
                                    <span>
                                        {trip.truck ? `${trip.truck.matricule} (${trip.truck.model})` : 'Unassigned Truck'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <User size={16} className="text-gray-400" />
                                    <span>
                                        {trip.driver ? `${trip.driver.firstName} ${trip.driver.lastName}` : 'Unassigned Driver'}
                                    </span>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                                {user.role === 'DRIVER' && trip.status === 'PLANNED' && (
                                    <button className="text-xs font-bold bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700">
                                        Start Trip
                                    </button>
                                )}
                                
                                {/* Admins get Delete */}
                                {user.role === 'ADMIN' && (
                                    <button 
                                        onClick={() => handleDelete(trip._id)}
                                        className="text-xs font-medium text-red-600 hover:bg-red-50 px-3 py-2 rounded transition-colors"
                                    >
                                        Cancel Mission
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <Map className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                        <h3 className="text-sm font-medium text-gray-900">No trips found</h3>
                        <p className="text-sm text-gray-500">
                            {user.role === 'ADMIN' ? 'Create a new mission to get started.' : 'You have no assigned trips yet.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TripList;