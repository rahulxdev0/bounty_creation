import { useLocation, useNavigate } from 'react-router-dom';
import Button from './form/Button';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const payload = location.state?.payload || {};

  const formatJSON = (obj) => JSON.stringify(obj, null, 2);

  const handleCreateAnother = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className=" p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Bounty Submission Result</h1>
              <p className="text-sm text-gray-600">Your bounty has been successfully created</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Submission Details</h2>
            <div className="bg-gray-900 text-green-400 rounded-lg p-6 overflow-auto max-h-[500px] font-mono text-sm">
              <pre>{formatJSON(payload)}</pre>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Bounty Title</h3>
              <p className="text-gray-700">{payload.title || 'N/A'}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Bounty Type</h3>
              <p className="text-gray-700">{payload.type || 'N/A'}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Reward Amount</h3>
              <p className="text-gray-700">
                {payload.reward?.currency} {payload.reward?.amount || '0'}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Mode</h3>
              <p className="text-gray-700 capitalize">{payload.mode || 'N/A'}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleCreateAnother} variant="primary">
              Create Another Bounty
            </Button>
            <Button
              onClick={() => {
                const dataStr = formatJSON(payload);
                const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
                const exportFileDefaultName = 'bounty-data.json';
                const linkElement = document.createElement('a');
                linkElement.setAttribute('href', dataUri);
                linkElement.setAttribute('download', exportFileDefaultName);
                linkElement.click();
              }}
              variant="outline"
            >
              Download JSON
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
