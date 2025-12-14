import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Home from './components/Home';
import PrivateLayout from './components/layouts/PrivateLayout';
import TruckList from './components/trucks/TruckList';
import TrailerList from './components/trailers/TrailerList';

const Dashboard = () => <h1 className="text-2xl font-bold">Dashboard Overview</h1>;
const TripList = () => <h1 className="text-2xl font-bold">Trip Management</h1>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />

        {/* Protected Driver & Admin Routes */}
        <Route element={<PrivateLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trips" element={<TripList />} />
        </Route>

        {/* Protected Admin ONLY Routes */}
        <Route element={<PrivateLayout allowedRoles={['ADMIN']} />}>
            <Route path="/trucks" element={<TruckList />} />
            <Route path="/trailers" element={<TrailerList />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;