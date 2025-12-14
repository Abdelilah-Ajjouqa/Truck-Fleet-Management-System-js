import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTruck, updateTruck } from '../../features/truckSlice';
import { X, Save } from 'lucide-react';

const TruckModal = ({ isOpen, onClose, truckToEdit }) => {
    const dispatch = useDispatch();

    const initialForm = {
        matricule: '',
        model: '',
        status: 'AVAILABLE',
        currentMileage: 0,
        tireCondition: 'GOOD'
    };

    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        if (truckToEdit) {
            setFormData(truckToEdit);
        } else {
            setFormData(initialForm);
        }
    }, [truckToEdit, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (truckToEdit) {
            const { _id, createdAt, updatedAt, __v, assignedDriver, ...cleanData } = formData;
            dispatch(updateTruck({ id: truckToEdit._id, data: cleanData }));
        } else {
            dispatch(createTruck(formData));
        }
        onClose(); 
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
                
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">
                        {truckToEdit ? 'Edit Truck' : 'Add New Truck'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    
                    {/* Matricule & Model */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
                            <input
                                type="text"
                                name="matricule"
                                required
                                value={formData.matricule}
                                onChange={(e) => setFormData({...formData, matricule: e.target.value.toUpperCase()})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all font-mono uppercase"
                                placeholder="1234-A-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                            <input
                                type="text"
                                name="model"
                                required
                                value={formData.model}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                                placeholder="Volvo FH16"
                            />
                        </div>
                    </div>

                    {/* Mileage */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Mileage (km)</label>
                        <input
                            type="number"
                            name="currentMileage"
                            min="0"
                            required
                            value={formData.currentMileage}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all"
                        />
                    </div>

                    {/* Status Select */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                            >
                                <option value="AVAILABLE">Available</option>
                                <option value="IN_TRANSIT">In Transit</option>
                                <option value="MAINTENANCE">Maintenance</option>
                                <option value="RESERVED">Reserved</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tires</label>
                            <select
                                name="tireCondition"
                                value={formData.tireCondition}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                            >
                                <option value="GOOD">Good</option>
                                <option value="WORN">Worn</option>
                                <option value="CRITICAL">Critical</option>
                            </select>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-white bg-black rounded-lg hover:bg-zinc-800 transition-colors font-medium shadow-lg"
                        >
                            <Save size={18} />
                            {truckToEdit ? 'Update Truck' : 'Create Truck'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TruckModal;