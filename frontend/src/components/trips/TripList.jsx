import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrips, deleteTrip } from '../../features/tripSlice';
import { Map, Plus, Trash2 } from 'lucide-react';
import TripModal from './TripModal';

const TripList = () => {
    const dispatch = useDispatch();
    const { trips, isLoading } = useSelector((state) => state.trips);
    const { user } = useSelector((state) => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getTrips());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Cancel trip?')) dispatch(deleteTrip(id));
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold flex items-center gap-2"><Map /> Missions</h1>
                {user.role === 'ADMIN' && (
                    <button onClick={() => setIsModalOpen(true)} className="bg-black text-white px-4 py-2 rounded flex items-center gap-2">
                        <Plus size={20} /> New Trip
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.length > 0 ? trips.map(trip => (
                    <div key={trip._id} className="bg-white p-6 rounded-xl shadow border">
                        <h3 className="font-bold">{trip.departure} → {trip.arrival}</h3>
                        <p className="text-sm text-gray-500">{new Date(trip.startDate).toLocaleDateString()}</p>
                        <div className="mt-4 text-sm space-y-2">
                            <p>🚛 {trip.truck ? trip.truck.matricule : 'No Truck'}</p>
                            <p>👤 {trip.driver ? `${trip.driver.firstName} ${trip.driver.lastName}` : 'No Driver'}</p>
                        </div>
                        {user.role === 'ADMIN' && (
                            <button onClick={() => handleDelete(trip._id)} className="mt-4 text-red-600 text-sm">Cancel</button>
                        )}
                    </div>
                )) : <p>No trips found.</p>}
            </div>

            <TripModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default TripList;