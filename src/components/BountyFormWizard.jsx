import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentStep, nextStep, previousStep, setStepValidation, resetForm, setData } from '../store/bountySlice';
import Sidebar from './Sidebar';
import Step1BasicDetails from './steps/Step1BasicDetails';
import Step2RewardsTimeline from './steps/Step2RewardsTimeline';
import Step3BackerInfo from './steps/Step3BackerInfo';
import Button from './form/Button';

export default function BountyFormWizard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentStep = useSelector((state) => state.bounty.currentStep);
  const formData = useSelector((state) => state.bounty.formData);
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate Step 1
  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.projectTitle.trim()) {
      newErrors.projectTitle = 'Project title is required';
    }

    if (!formData.type) {
      newErrors.type = 'Bounty type is required';
    }

    if (!formData.dominant_core) {
      newErrors.dominant_core = 'Dominant impact core is required';
    }

    if (formData.mode === 'physical' && !formData.location.trim()) {
      newErrors.location = 'Location is required for physical mode';
    }

    return newErrors;
  };

  // Validate Step 2
  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.reward.amount || formData.reward.amount <= 0) {
      newErrors['reward.amount'] = 'Amount must be greater than 0';
    }

    if (!formData.reward.winners || formData.reward.winners < 1) {
      newErrors['reward.winners'] = 'Number of winners must be at least 1';
    }

    if (!formData.timeline.expiration_date) {
      newErrors['timeline.expiration_date'] = 'Expiration date is required';
    } else {
      const expirationDate = new Date(formData.timeline.expiration_date);
      const now = new Date();
      if (expirationDate <= now) {
        newErrors['timeline.expiration_date'] = 'Expiration date must be in the future';
      }
    }

    if (formData.hasImpactCertificate && !formData.impactBriefMessage.trim()) {
      newErrors.impactBriefMessage = 'Impact brief is required when impact certificate is enabled';
    }

    return newErrors;
  };

  // Validate Step 3
  const validateStep3 = () => {
    const newErrors = {};

    if (formData.has_backer) {
      if (!formData.backer.name.trim()) {
        newErrors['backer.name'] = 'Backer name is required';
      }

      if (!formData.backer.logo) {
        newErrors['backer.logo'] = 'Backer logo is required';
      }
    }

    if (!formData.terms_accepted) {
      newErrors.terms_accepted = 'You must accept the terms and conditions';
    }

    return newErrors;
  };

  // Validate current step
  const validateCurrentStep = () => {
    let stepErrors = {};

    switch (currentStep) {
      case 0:
        stepErrors = validateStep1();
        break;
      case 1:
        stepErrors = validateStep2();
        break;
      case 2:
        stepErrors = validateStep3();
        break;
      default:
        break;
    }

    setErrors(stepErrors);
    const isValid = Object.keys(stepErrors).length === 0;
    dispatch(setStepValidation({ step: currentStep, isValid }));
    return isValid;
  };

  // Update validation silently when form data changes (for button state)
  useEffect(() => {
    const stepErrors = validateCurrentStep();
    if (!showErrors) {
      setErrors({});
    }
  }, [formData, currentStep]);

  // Reset showErrors when changing steps
  useEffect(() => {
    setShowErrors(false);
    setErrors({});
  }, [currentStep]);

  const handleNext = () => {
    setShowErrors(true);
    if (validateCurrentStep()) {
      dispatch(nextStep());
      window.scrollTo(0, 0);
      setShowErrors(false);
    }
  };

  const handlePrevious = () => {
    dispatch(previousStep());
    setErrors({});
    setShowErrors(false);
    window.scrollTo(0, 0);
  };

  const handleStepClick = (stepId) => {
    dispatch(setCurrentStep(stepId));
    setErrors({});
    setShowErrors(false);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    setShowErrors(true);
    if (!validateCurrentStep()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate server request
    setTimeout(() => {
      // Format the payload
      const payload = {
        title: formData.title,
        description: formData.description,
        projectTitle: formData.projectTitle,
        type: formData.type,
        dominant_core: formData.dominant_core,
        mode: formData.mode,
        ...(formData.mode === 'physical' && { location: formData.location }),
        reward: {
          currency: formData.reward.currency,
          amount: formData.reward.amount,
          winners: formData.reward.winners,
        },
        timeline: {
          expiration_date: new Date(formData.timeline.expiration_date).toISOString(),
          estimated_completion: {
            days: formData.timeline.estimated_completion.days,
            hours: formData.timeline.estimated_completion.hours,
            minutes: formData.timeline.estimated_completion.minutes,
          },
        },
        hasImpactCertificate: formData.hasImpactCertificate,
        ...(formData.hasImpactCertificate && { impactBriefMessage: formData.impactBriefMessage }),
        sdgs: formData.sdgs,
        has_backer: formData.has_backer,
        ...(formData.has_backer && {
          backer: {
            name: formData.backer.name,
            logo: formData.backer.logo,
            message: formData.backer.message,
          },
        }),
        terms_accepted: formData.terms_accepted,
      };

      console.log('Bounty Payload:', payload);
      dispatch(setData(payload));
      
      setIsSubmitting(false);
      
      // Navigate to confirmation screen
      navigate('/confirmation');
      
      // Navigate to result page after delay
      setTimeout(() => {
        navigate('/result', { state: { payload } });
        dispatch(resetForm());
      }, 2000);
    }, 1500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1BasicDetails errors={showErrors ? errors : {}} />;
      case 1:
        return <Step2RewardsTimeline errors={showErrors ? errors : {}} />;
      case 2:
        return <Step3BackerInfo errors={showErrors ? errors : {}} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:grid  md:grid-cols-12 min-h-screen max-w-6xl mx-auto w-full items-center justify-center">
      <div className="md:col-span-2 h-full">
        <Sidebar onStepClick={handleStepClick} />
      </div>

      <div className="flex-1 p-8 md:col-span-8 w-full">
        <div className="max-w-3xl mx-auto">
          <div className=" md:p-8">
            {renderStep()}

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="secondary"
              >
                ← Back
              </Button>

              {currentStep < 2 ? (
                <Button
                  onClick={handleNext}
                  disabled={Object.keys(errors).length > 0}
                  variant="primary"
                >
                  Next →
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={Object.keys(errors).length > 0 || isSubmitting}
                  variant="success"
                >
                  {isSubmitting ? 'Creating Bounty...' : 'Create Bounty'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-4"></div>
    </div>
  );
}
