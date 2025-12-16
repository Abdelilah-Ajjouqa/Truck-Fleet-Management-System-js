import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrucks } from '../features/truckSlice';
import { getTrailers } from '../features/trailerSlice';
import { getTrips } from '../features/tripSlice';
import { Truck, Map, Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const Dashboard = () => {
    const dispatch = useDispatch();
    
    // Get Data from Redux
    const { trucks } = useSelector((state) => state.trucks);
    const { trailers } = useSelector((state) => state.trailers);
    const { trips } = useSelector((state) => state.trips);
    const { user } = useSelector((state) => state.auth);

    // Fetch Fresh Data on Mount
    useEffect(() => {
        dispatch(getTrucks());
        dispatch(getTrailers());
        dispatch(getTrips());
    }, [dispatch]);

    // Calculate Real-time Stats
    const stats = {
        totalTrucks: trucks.length,
        availableTrucks: trucks.filter(t => t.status === 'AVAILABLE').length,
        maintenanceTrucks: trucks.filter(t => t.status === 'MAINTENANCE').length,
        activeTrips: trips.filter(t => t.status === 'IN_PROGRESS').length,
        completedTrips: trips.filter(t => t.status === 'COMPLETED').length,
        criticalTires: trucks.filter(t => t.tireCondition === 'CRITICAL').length
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Welcome back, {user.firstName}!
                </h1>
                <p className="text-gray-500 mt-2">
                    Here is what's happening with your fleet today.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-black text-white p-6 rounded-xl shadow-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-400 text-sm font-medium">Active Missions</p>
                            <h3 className="text-4xl font-bold mt-2">{stats.activeTrips}</h3>
                        </div>
                        <div className="p-3 bg-zinc-800 rounded-lg">
                            <Activity size={24} className="text-green-400" />
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-400 flex items-center gap-1">
                        <Clock size={14} />
                        <span>Drivers currently on road</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Available Trucks</p>
                            <h3 className="text-4xl font-bold text-gray-900 mt-2">{stats.availableTrucks}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Truck size={24} className="text-blue-600" />
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                        Out of <span className="font-bold">{stats.totalTrucks}</span> total units
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Completed Jobs</p>
                            <h3 className="text-4xl font-bold text-gray-900 mt-2">{stats.completedTrips}</h3>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <CheckCircle size={24} className="text-green-600" />
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                        Lifetime delivered missions
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Maintenance Alerts</p>
                            <h3 className="text-4xl font-bold text-red-600 mt-2">{stats.maintenanceTrucks + stats.criticalTires}</h3>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg">
                            <AlertTriangle size={24} className="text-red-600" />
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-red-500 font-medium">
                        {stats.criticalTires} trucks have critical tires
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Map size={20} /> Recent Activity
                    </h3>
                    <div className="space-y-4">
                        {trips.slice(0, 4).map(trip => (
                            <div key={trip._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${trip.status === 'IN_PROGRESS' ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{trip.departure} → {trip.destination}</p>
                                        <p className="text-xs text-gray-500">{new Date(trip.startDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-600">
                                    {trip.status}
                                </span>
                            </div>
                        ))}
                        {trips.length === 0 && <p className="text-gray-400 text-sm">No recent activity.</p>}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <AlertTriangle size={20} className="text-amber-500" /> Maintenance Watchlist
                    </h3>
                    <div className="space-y-3">
                        {trucks.filter(t => t.tireCondition === 'CRITICAL' || t.status === 'MAINTENANCE').slice(0, 4).map(truck => (
                            <div key={truck._id} className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Truck size={18} className="text-red-500" />
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{truck.matricule}</p>
                                        <p className="text-xs text-red-600">{truck.model}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-xs font-bold text-red-700 bg-red-100 px-2 py-1 rounded">
                                        {truck.tireCondition === 'CRITICAL' ? 'BAD TIRES' : 'IN REPAIR'}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {trucks.filter(t => t.tireCondition === 'CRITICAL' || t.status === 'MAINTENANCE').length === 0 && (
                            <div className="text-center py-6 text-gray-400 text-sm">
                                <CheckCircle className="mx-auto mb-2 text-green-400" />
                                All systems operational.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;