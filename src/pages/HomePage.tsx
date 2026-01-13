import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Active Gigs
                </p>
                <p className="text-3xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Earnings
                </p>
                <p className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  $3,240
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Rating
                </p>
                <p className="text-3xl font-bold text-gray-900">4.9</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Next Due
                </p>
                <p className="text-3xl font-bold text-gray-900">2 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Link to="/gigs/new" className="group">
            <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 border border-white/50">
              <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                New Gig
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Create a new project opportunity
              </p>
            </div>
          </Link>

          <Link to="/gigs" className="group">
            <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 border border-white/50">
              <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                My Gigs
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Manage active projects
              </p>
            </div>
          </Link>

          <Link to="/profile" className="group">
            <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 border border-white/50">
              <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                Profile
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Update your information
              </p>
            </div>
          </Link>

          <Link to="/billing" className="group">
            <div className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 border border-white/50">
              <div className="w-16 h-16 bg-linear-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                Billing
              </h3>
              <p className="text-gray-600 text-center mb-6">
                View invoices & payments
              </p>
            </div>
          </Link>
        </div>

        {/* Welcome Message */}
        <div className="text-center">
          <h1 className="text-5xl lg:text-6xl font-black bg-linear-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-6">
            Welcome back!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Manage your freelance gigs, track earnings, and grow your business
            with
            <span className="font-semibold text-indigo-600"> GigFlow</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
