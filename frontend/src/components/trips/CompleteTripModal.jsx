import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTripStatus } from '../../features/tripSlice';
import { X, CheckCircle, Fuel, Gauge } from 'lucide-react';

const CompleteTripModal = ({ isOpen, onClose, trip }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        currentMileage: '',
        fuelLevel: '',
        remarks: ''
    });

    if (!isOpen || !trip) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Dispatch the "COMPLETED" status with the data
        dispatch(updateTripStatus({
            id: trip._id,
            data: {
                status: 'COMPLETED',
                currentMileage: Number(formData.currentMileage),
                fuelLevel: Number(formData.fuelLevel),
                remarks: formData.remarks
            }
        }));
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 animate-fade-in-up">
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-gray-900">Complete Mission</h2>
                    <button onClick={onClose}><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Mileage */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                            <Gauge size={16} /> Final Mileage (km)
                        </label>
                        <input 
                            type="number" 
                            required 
                            min={trip.startMileage}
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            value={formData.currentMileage}
                            onChange={(e) => setFormData({...formData, currentMileage: e.target.value})}
                            placeholder={`Start was: ${trip.startMileage} km`}
                        />
                        <p className="text-xs text-gray-400 mt-1">Must be higher than {trip.startMileage}</p>
                    </div>

                    {/* Fuel */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                            <Fuel size={16} /> Fuel Level (%)
                        </label>
                        <input 
                            type="number" 
                            required 
                            min="0" 
                            max="100"
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            value={formData.fuelLevel}
                            onChange={(e) => setFormData({...formData, fuelLevel: e.target.value})}
                            placeholder="e.g. 80"
                        />
                    </div>

                    {/* Remarks */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Remarks (Optional)</label>
                        <textarea 
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                            value={formData.remarks}
                            onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                            placeholder="Any issues on the road?"
                            rows="3"
                        />
                    </div>

                    <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 flex justify-center gap-2 transition-colors shadow-lg">
                        <CheckCircle size={20} /> 
                        Confirm Completion
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompleteTripModal;