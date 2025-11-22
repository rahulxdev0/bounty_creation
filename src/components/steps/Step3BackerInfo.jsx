import { useDispatch, useSelector } from 'react-redux';
import { updateFormData, updateNestedFormData } from '../../store/bountySlice';
import Toggle from '../form/Toggle';
import TextInput from '../form/TextInput';
import TextArea from '../form/TextArea';
import FileUpload from '../form/FileUpload';

export default function Step3BackerInfo({ errors }) {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.bounty.formData);

  const handleBackerToggle = (checked) => {
    dispatch(updateFormData({ has_backer: checked }));
    if (!checked) {
      dispatch(updateNestedFormData({ path: 'backer.name', value: '' }));
      dispatch(updateNestedFormData({ path: 'backer.logo', value: '' }));
      dispatch(updateNestedFormData({ path: 'backer.message', value: '' }));
    }
  };

  const handleBackerChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateNestedFormData({ path: `backer.${name}`, value }));
  };

  const handleLogoChange = (value) => {
    dispatch(updateNestedFormData({ path: 'backer.logo', value }));
  };

  const handleTermsChange = (e) => {
    dispatch(updateFormData({ terms_accepted: e.target.checked }));
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Backer Information</h2>
        <p className="text-sm text-gray-600 mt-1">Add sponsor or backer details</p>
      </div>

      {/* Backer Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <Toggle
          label="Has Backer?"
          name="has_backer"
          checked={formData.has_backer}
          onChange={handleBackerToggle}
          description="Enable if this bounty has a sponsor or backer"
        />

        {formData.has_backer && (
          <div className="mt-6 space-y-4">
            <TextInput
              label="Backer Name"
              name="name"
              value={formData.backer.name}
              onChange={handleBackerChange}
              placeholder="Enter backer/sponsor name"
              required
              error={errors['backer.name']}
            />

            <FileUpload
              label="Backer Logo"
              name="logo"
              value={formData.backer.logo}
              onChange={handleLogoChange}
              required
              error={errors['backer.logo']}
              accept="image/*"
              placeholder="Enter logo URL or upload file"
            />

            <TextArea
              label="Backer Message"
              name="message"
              value={formData.backer.message}
              onChange={handleBackerChange}
              placeholder="Optional message from the backer"
              rows={3}
            />
          </div>
        )}
      </div>

      {/* Terms & Conditions */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Terms & Conditions</h3>
        
        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms_accepted"
            checked={formData.terms_accepted}
            onChange={handleTermsChange}
            className="w-4 h-4 mt-1 text-blue-600 focus:ring-2 focus:ring-blue-500 rounded cursor-pointer"
          />
          <label htmlFor="terms_accepted" className="ml-3 text-sm text-gray-700 cursor-pointer">
            I accept the terms and conditions <span className="text-red-500">*</span>
            <p className="text-xs text-gray-500 mt-1">
              By checking this box, you agree to abide by the platform's terms of service 
              and confirm that all information provided is accurate.
            </p>
          </label>
        </div>
        
        {errors.terms_accepted && (
          <p className="text-xs text-red-500 mt-2">{errors.terms_accepted}</p>
        )}
      </div>
    </div>
  );
}
