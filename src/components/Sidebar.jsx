import { useSelector } from 'react-redux';

const steps = [
  { id: 0, label: 'Basics', step: '1.' },
  { id: 1, label: 'Rewards', step: '2.' },
  { id: 2, label: 'Backer', step: '3.' },
];

export default function Sidebar({ onStepClick }) {
  const currentStep = useSelector((state) => state.bounty.currentStep);
  const stepValidation = useSelector((state) => state.bounty.stepValidation);

  const handleStepClick = (stepId) => {
    // Allow navigation backwards freely
    if (stepId < currentStep) {
      onStepClick(stepId);
      return;
    }

    // Allow navigation forward only if previous steps are valid
    if (stepId > currentStep) {
      let canNavigateForward = true;
      for (let i = 0; i < stepId; i++) {
        if (!stepValidation[i]) {
          canNavigateForward = false;
          break;
        }
      }
      if (canNavigateForward) {
        onStepClick(stepId);
      }
    }
  };

  return (
    <div className="mt-20">
      <div className="mb-2">
        <h1 className="text-xl font-semibold text-gray-500">Bounty Steps</h1>
      </div>

      <nav className="flex md:flex-col">
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = stepValidation[step.id];
          const isAccessible = step.id <= currentStep || isCompleted;

          return (
            <button
              key={step.id}
              onClick={() => handleStepClick(step.id)}
              disabled={!isAccessible}
              className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-all cursor-pointer text-left ${
                isActive
                  ? 'text-blue-600 text-lg font-semibold'
                  : 'text-gray-400 hover:bg-text-gray-400'
              }`}
            >
              <span className="text-xl">{step.step}</span>
              <div className="flex-1">
                <div className="font-medium">{step.label}</div>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
