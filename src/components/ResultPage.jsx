import { useLocation, useNavigate } from "react-router-dom";
import Button from "./form/Button";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const payload = location.state?.payload;

  if (!payload) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Data Found</h1>
          <Button onClick={() => navigate("/")}>
            Create New Bounty
          </Button>
        </div>
      </div>
    );
  }

  const handleCreateAnother = () => navigate("/");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bounty Created Successfully</h1>
          <p className="text-gray-600">Your bounty submission has been processed</p>
        </div>

        {/* Main Content */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Submission Details</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Title</p>
                <p className="font-medium text-gray-900">{payload.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium text-gray-900">{payload.type}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Project</p>
                <p className="font-medium text-gray-900">{payload.projectTitle}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Core</p>
                <p className="font-medium text-gray-900 capitalize">{payload.dominant_core?.toLowerCase()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Reward</p>
                <p className="font-medium text-gray-900">
                  {payload.reward?.currency} {payload.reward?.amount}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Winners</p>
                <p className="font-medium text-gray-900">{payload.reward?.winners}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Mode</p>
                <p className="font-medium text-gray-900 capitalize">{payload.mode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expires</p>
                <p className="font-medium text-gray-900">
                  {payload.timeline?.expiration_date ? formatDate(payload.timeline.expiration_date) : 'N/A'}
                </p>
              </div>
            </div>

            {payload.location && (
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-900">{payload.location}</p>
              </div>
            )}

            {payload.description && (
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-gray-900 mt-1">{payload.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Impact Certificate</p>
                <p className="font-medium text-gray-900">{payload.hasImpactCertificate ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Terms Accepted</p>
                <p className="font-medium text-gray-900">{payload.terms_accepted ? 'Yes' : 'No'}</p>
              </div>
            </div>

            {payload.sdgs && payload.sdgs.length > 0 && (
              <div>
                <p className="text-sm text-gray-500 mb-2">SDGs</p>
                <div className="flex flex-wrap gap-2">
                  {payload.sdgs.map((sdg, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {sdg}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button onClick={handleCreateAnother}>
            Create Another
          </Button>
        </div>
      </div>
    </div>
  );
}