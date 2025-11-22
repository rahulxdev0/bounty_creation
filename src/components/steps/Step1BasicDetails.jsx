import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, updateNestedFormData } from '../../store/bountySlice';
import TextInput from '../form/TextInput';
import TextArea from '../form/TextArea';
import Dropdown from '../form/Dropdown';
import RadioGroup from '../form/RadioGroup';

const bountyTypes = [
  { value: 'Content', label: 'Content' },
  { value: 'Design', label: 'Design' },
  { value: 'Development', label: 'Development' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Other', label: 'Other' },
];

const dominantCores = [
  { value: 'Water', label: 'Water' },
  { value: 'Earth', label: 'Earth' },
  { value: 'Social', label: 'Social' },
  { value: 'Energy', label: 'Energy' },
];

const modeOptions = [
  { value: 'digital', label: 'Digital' },
  { value: 'physical', label: 'Physical' },
];

export default function Step1BasicDetails({ errors }) {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.bounty.formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleModeChange = (e) => {
    const value = e.target.value;
    dispatch(updateFormData({ mode: value }));
    if (value === 'digital') {
      dispatch(updateFormData({ location: '' }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Basic Details</h2>
        <p className="text-sm text-gray-600 mt-1">Tell us about your bounty</p>
      </div>

      <TextInput
        label="Bounty Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter bounty title"
        required
        maxLength={40}
        error={errors.title}
      />

      <TextArea
        label="Bounty Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Describe your bounty in detail"
        required
        rows={5}
        error={errors.description}
      />

      <TextInput
        label="Project Title"
        name="projectTitle"
        value={formData.projectTitle}
        onChange={handleChange}
        placeholder="Enter project title"
        required
        error={errors.projectTitle}
      />

      <Dropdown
        label="Bounty Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        options={bountyTypes}
        required
        error={errors.type}
        placeholder="Select bounty type"
      />

      <Dropdown
        label="Dominant Impact Core"
        name="dominant_core"
        value={formData.dominant_core}
        onChange={handleChange}
        options={dominantCores}
        required
        error={errors.dominant_core}
        placeholder="Select impact core"
      />

      <RadioGroup
        label="Bounty Mode"
        name="mode"
        value={formData.mode}
        onChange={handleModeChange}
        options={modeOptions}
        required
        error={errors.mode}
      />

      {formData.mode === 'physical' && (
        <TextInput
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter location"
          required
          error={errors.location}
        />
      )}
    </div>
  );
}
