import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTrip } from '../../features/tripSlice';
import { getTrucks } from '../../features/truckSlice';
import { getTrailers } from '../../features/trailerSlice';
import { getDrivers } from '../../features/authSlice';
import { X, Save } from 'lucide-react';

const TripModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    
    const { trucks } = useSelector((state) => state.trucks);
    const { trailers } = useSelector((state) => state.trailers);
    const { drivers } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        departure: '',
        arrival: '',
        startDate: '',
        truck: '',
        trailer: '',
        driver: ''
    });

    useEffect(() => {
        if (isOpen) {
            dispatch(getTrucks());
            dispatch(getTrailers());
            dispatch(getDrivers());
        }
    }, [dispatch, isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createTrip(formData));
        onClose();
        setFormData({ departure: '', arrival: '', startDate: '', truck: '', trailer: '', driver: '' });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Plan New Mission</h2>
                    <button onClick={onClose}><X size={24} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" name="departure" required onChange={handleChange} placeholder="Departure" className="border p-2 rounded w-full"/>
                        <input type="text" name="arrival" required onChange={handleChange} placeholder="Arrival" className="border p-2 rounded w-full"/>
                    </div>
                    <input type="date" name="startDate" required onChange={handleChange} className="border p-2 rounded w-full"/>
                    
                    <select name="driver" required onChange={handleChange} className="border p-2 rounded w-full">
                        <option value="">Select Driver</option>
                        {drivers?.map(d => <option key={d._id} value={d._id}>{d.firstName} {d.lastName}</option>)}
                    </select>

                    <select name="truck" required onChange={handleChange} className="border p-2 rounded w-full">
                        <option value="">Select Truck</option>
                        {trucks?.map(t => <option key={t._id} value={t._id}>{t.matricule} ({t.status})</option>)}
                    </select>

                    <select name="trailer" required onChange={handleChange} className="border p-2 rounded w-full">
                        <option value="">Select Trailer</option>
                        {trailers?.map(t => <option key={t._id} value={t._id}>{t.matricule} ({t.status})</option>)}
                    </select>

                    <button type="submit" className="w-full bg-black text-white p-3 rounded font-bold hover:bg-zinc-800">
                        Create Mission
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TripModal;