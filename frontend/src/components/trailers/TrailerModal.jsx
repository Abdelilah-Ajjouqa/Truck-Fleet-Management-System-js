import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTrailer, updateTrailer } from '../../features/trailerSlice';
import { X, Save } from 'lucide-react';

const TrailerModal = ({ isOpen, onClose, trailerToEdit }) => {
    const dispatch = useDispatch();

    const initialForm = {
        matricule: '',
        type: 'PLATEAU',
        status: 'AVAILABLE',
        tireCondition: 'GOOD'
    };

    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        if (trailerToEdit) {
            setFormData(trailerToEdit);
        } else {
            setFormData(initialForm);
        }
    }, [trailerToEdit, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (trailerToEdit) {
            const { _id, createdAt, updatedAt, ...cleanData } = formData;
            dispatch(updateTrailer({ id: trailerToEdit._id, data: cleanData }));
        } else {
            dispatch(createTrailer(formData));
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
                
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">
                        {trailerToEdit ? 'Edit Trailer' : 'Add New Trailer'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    
                    {/* Matricule */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
                        <input
                            type="text"
                            name="matricule"
                            required
                            value={formData.matricule}
                            onChange={(e) => setFormData({...formData, matricule: e.target.value.toUpperCase()})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all font-mono uppercase"
                            placeholder="R-9999-50"
                        />
                    </div>

                    {/* Type Select */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Trailer Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                        >
                            <option value="PLATEAU">Plateau (Flatbed)</option>
                            <option value="BACHE">Baché (Tarp)</option>
                            <option value="FRIGO">Frigo (Refrigerated)</option>
                            <option value="CITERNE">Citerne (Tanker)</option>
                        </select>
                    </div>

                    {/* Status & Tires */}
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

                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium">
                            Cancel
                        </button>
                        <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-white bg-black rounded-lg hover:bg-zinc-800 shadow-lg font-medium">
                            <Save size={18} />
                            {trailerToEdit ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TrailerModal;