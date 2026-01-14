import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto w-32 h-32 mb-8">
          <div className="w-full h-full bg-linear-to-r from-pink-400 via-purple-400 to-blue-400 rounded-3xl shadow-2xl flex items-center justify-center transform rotate-6 hover:-rotate-1 transition-transform duration-300">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-12 h-12 text-white/90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-black bg-linear-to-r from-gray-900 via-gray-700 to-slate-600 bg-clip-text text-transparent mb-4 tracking-tight">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>

        <p className="text-lg text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back to exploring amazing gigs!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-1 transition-all duration-200 text-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
