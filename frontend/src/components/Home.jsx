import { Link } from 'react-router-dom';
import bgImage from '../assets/cover.png';

const Home = () => {
    return (
        <div className="flex min-h-screen w-full flex-col bg-gray-50 text-gray-800">

            {/* HERO SECTION */}
            <div className="relative h-screen w-full overflow-hidden">
                <div
                    className="absolute inset-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${bgImage})` }}
                >
                    <div className="absolute inset-0 bg-linear-to-b from-gray-900/80 via-gray-900/60 to-gray-900/90"></div>
                </div>

                <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
                    <h1 className="mb-6 text-5xl font-black tracking-tight drop-shadow-lg sm:text-7xl md:text-8xl">
                        LOGISTICS <span className="text-blue-500">REIMAGINED</span>
                    </h1>

                    <p className="mb-10 max-w-3xl text-xl font-light text-gray-300 sm:text-2xl leading-relaxed">
                        Master your fleet's efficiency. From real-time tire tracking to automated trip assignments—powering the next generation of transport.
                    </p>

                    {/* GUEST-ONLY CTA */}
                    <div className="flex gap-4 animate-fade-in-up">
                        <Link to="/login" className="bg-white text-black py-2 px-3.5 rounded-md hover:scale-105 duration-300 shadow-md shadow-gray">
                            Employee Login
                        </Link>
                        <Link to="/register" className="bg-black text-white py-2 px-3.5 rounded-md hover:scale-105 duration-300 shadow-md shadow-gray">
                            Join the Network
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-8 w-full text-center text-white/50 animate-bounce">
                    <p className="text-sm uppercase tracking-widest">Scroll to Explore</p>
                    <span className="text-2xl">↓</span>
                </div>
            </div>

            {/* CORE CAPABILITIES SECTION */}
            <div className="w-full bg-white py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600">Precision Engineering</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Everything your fleet needs to scale
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Stop relying on spreadsheets. Our centralized platform handles the complexity of modern logistics so you can focus on the road.
                        </p>
                    </div>

                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            <FeatureCard
                                title="Smart Resource Tracking"
                                desc="Monitor trucks, trailers, and even tire health in real-time. Prevent downtime with predictive maintenance alerts."
                                icon="🚛"
                            />
                            <FeatureCard
                                title="Seamless Trip Management"
                                desc="Admins assign routes; Drivers receive instant PDF mission orders. Status updates (ToDo, In Progress, Done) sync instantly."
                                icon="🗺️"
                            />
                            <FeatureCard
                                title="Fuel & Cost Analytics"
                                desc="Track mileage and consumption per trip. Validate operational data to optimize costs and reduce waste."
                                icon="⛽"
                            />
                        </dl>
                    </div>
                </div>
            </div>

            {/* WORKFLOW SECTION */}
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Designed for Teams</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            A unified ecosystem connecting the office to the highway.
                        </p>
                    </div>
                    <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                            <span className="flex items-center gap-2"><span className="text-blue-400">01.</span> Admin Plans Route</span>
                            <span className="text-gray-600">→</span>
                            <span className="flex items-center gap-2"><span className="text-blue-400">02.</span> Driver Receives PDF</span>
                            <span className="text-gray-600">→</span>
                            <span className="flex items-center gap-2"><span className="text-blue-400">03.</span> Trip Executed</span>
                            <span className="text-gray-600">→</span>
                            <span className="flex items-center gap-2"><span className="text-blue-400">04.</span> Data Validated</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="bg-gray-50 border-t border-gray-200">
                <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 lg:px-8">
                    <p className="text-center text-xs leading-5 text-gray-500">
                        &copy; 2025 Global Logistics Solutions. MERN Stack Professional Project.
                    </p>
                </div>
            </footer>

        </div>
    );
};

// helper component
const FeatureCard = ({ title, desc, icon }) => (
    <div className="flex flex-col">
        <dt className="text-base font-semibold leading-7 text-gray-900 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white text-xl">
                {icon}
            </div>
            {title}
        </dt>
        <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
            <p className="flex-auto">{desc}</p>
        </dd>
    </div>
);

export default Home;