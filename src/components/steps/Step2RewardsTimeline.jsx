import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, updateNestedFormData } from '../../store/bountySlice';
import Dropdown from '../form/Dropdown';
import NumberInput from '../form/NumberInput';
import DatePicker from '../form/DatePicker';
import Toggle from '../form/Toggle';
import TextInput from '../form/TextInput';
import MultiSelectDropdown from '../form/MultiSelectDropdown';

const currencies = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'INR', label: 'INR (₹)' },
  { value: 'GBP', label: 'GBP (£)' },
];

const sdgOptions = [
  { value: 'SDG1', label: 'No Poverty' },
  { value: 'SDG2', label: 'Zero Hunger' },
  { value: 'SDG3', label: 'Good Health and Well-being' },
  { value: 'SDG4', label: 'Quality Education' },
  { value: 'SDG5', label: 'Gender Equality' },
  { value: 'SDG6', label: 'Clean Water and Sanitation' },
  { value: 'SDG7', label: 'Affordable and Clean Energy' },
  { value: 'SDG8', label: 'Decent Work and Economic Growth' },
  { value: 'SDG9', label: 'Industry, Innovation and Infrastructure' },
  { value: 'SDG10', label: 'Reduced Inequalities' },
  { value: 'SDG11', label: 'Sustainable Cities and Communities' },
  { value: 'SDG12', label: 'Responsible Consumption and Production' },
  { value: 'SDG13', label: 'Climate Action' },
  { value: 'SDG14', label: 'Life Below Water' },
  { value: 'SDG15', label: 'Life on Land' },
  { value: 'SDG16', label: 'Peace, Justice and Strong Institutions' },
  { value: 'SDG17', label: 'Partnerships for the Goals' },
];

export default function Step2RewardsTimeline({ errors }) {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.bounty.formData);

  const handleRewardChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateNestedFormData({ 
      path: `reward.${name}`, 
      value: name === 'currency' ? value : Number(value) 
    }));
  };

  const handleTimelineChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateNestedFormData({ 
      path: `timeline.${name}`, 
      value 
    }));
  };

  const handleEstimatedCompletionChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateNestedFormData({ 
      path: `timeline.estimated_completion.${name}`, 
      value: Number(value) 
    }));
  };

  const handleImpactCertificateToggle = (checked) => {
    dispatch(updateFormData({ hasImpactCertificate: checked }));
    if (!checked) {
      dispatch(updateFormData({ impactBriefMessage: '' }));
    }
  };

  const handleImpactBriefChange = (e) => {
    dispatch(updateFormData({ impactBriefMessage: e.target.value }));
  };

  const handleSdgChange = (value) => {
    dispatch(updateFormData({ sdgs: value }));
  };

  const getTodayDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Rewards & Timeline</h2>
        <p className="text-sm text-gray-600 mt-1">Set rewards and deadlines</p>
      </div>

      {/* Reward Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Reward</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Dropdown
            label="Currency"
            name="currency"
            value={formData.reward.currency}
            onChange={handleRewardChange}
            options={currencies}
            required
            error={errors['reward.currency']}
          />

          <NumberInput
            label="Total Reward Amount"
            name="amount"
            value={formData.reward.amount}
            onChange={handleRewardChange}
            placeholder="0"
            required
            min={1}
            error={errors['reward.amount']}
          />

          <NumberInput
            label="Number of Winners"
            name="winners"
            value={formData.reward.winners}
            onChange={handleRewardChange}
            placeholder="1"
            required
            min={1}
            error={errors['reward.winners']}
          />
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Timeline</h3>
        
        <DatePicker
          label="Expiration Date"
          name="expiration_date"
          value={formData.timeline.expiration_date}
          onChange={handleTimelineChange}
          required
          min={getTodayDateTime()}
          error={errors['timeline.expiration_date']}
        />

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Completion Time
          </label>
          <div className="grid grid-cols-3 gap-4">
            <NumberInput
              label="Days"
              name="days"
              value={formData.timeline.estimated_completion.days}
              onChange={handleEstimatedCompletionChange}
              placeholder="0"
              min={0}
            />
            <NumberInput
              label="Hours"
              name="hours"
              value={formData.timeline.estimated_completion.hours}
              onChange={handleEstimatedCompletionChange}
              placeholder="0"
              min={0}
              max={23}
            />
            <NumberInput
              label="Minutes"
              name="minutes"
              value={formData.timeline.estimated_completion.minutes}
              onChange={handleEstimatedCompletionChange}
              placeholder="0"
              min={0}
              max={59}
            />
          </div>
        </div>
      </div>

      {/* Impact Certificate Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Impact Certificate</h3>
        
        <Toggle
          label="Has Impact Certificate?"
          name="hasImpactCertificate"
          checked={formData.hasImpactCertificate}
          onChange={handleImpactCertificateToggle}
          description="Enable if this bounty qualifies for an impact certificate"
        />

        {formData.hasImpactCertificate && (
          <div className="mt-4">
            <TextInput
              label="Impact Brief"
              name="impactBriefMessage"
              value={formData.impactBriefMessage}
              onChange={handleImpactBriefChange}
              placeholder="Brief description of the impact"
              required
              error={errors.impactBriefMessage}
            />
          </div>
        )}
      </div>

      {/* SDGs Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Sustainable Development Goals</h3>
        
        <MultiSelectDropdown
          label="SDGs"
          name="sdgs"
          value={formData.sdgs}
          onChange={handleSdgChange}
          options={sdgOptions}
          placeholder="Select applicable SDGs"
          error={errors.sdgs}
        />
      </div>
    </div>
  );
}
