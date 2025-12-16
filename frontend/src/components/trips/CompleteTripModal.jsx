import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTripStatus } from '../../features/tripSlice';
import { X, CheckCircle } from 'lucide-react';

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
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Complete Mission</h2>
                    <button onClick={onClose}><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Final Mileage (km)</label>
                        <input
                            type="number"
                            required
                            min={trip.startMileage}
                            className="w-full border p-2 rounded-lg mt-1"
                            value={formData.currentMileage}
                            onChange={(e) => setFormData({ ...formData, currentMileage: e.target.value })}
                            placeholder={`Must be > ${trip.startMileage}`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fuel Level (%)</label>
                        <input
                            type="number"
                            required
                            min="0"
                            max="100"
                            className="w-full border p-2 rounded-lg mt-1"
                            value={formData.fuelLevel}
                            onChange={(e) => setFormData({ ...formData, fuelLevel: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Remarks (Optional)</label>
                        <textarea
                            className="w-full border p-2 rounded-lg mt-1"
                            value={formData.remarks}
                            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                            placeholder="Any issues on the road?"
                        />
                    </div>

                    <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 flex justify-center gap-2">
                        <CheckCircle size={20} /> Confirm Completion
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompleteTripModal;