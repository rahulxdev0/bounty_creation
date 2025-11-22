import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConfirmationScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/result');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <div className="text-center">
        <div className="inline-block mb-6">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Bounty Created!</h1>
        <p className="text-gray-600">Redirecting to results...</p>
        <div className="mt-6 flex justify-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
}
