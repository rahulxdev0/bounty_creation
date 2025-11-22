import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 0,
  formData: {
    title: '',
    description: '',
    projectTitle: '',
    type: '',
    dominant_core: '',
    mode: 'digital',
    location: '',
    reward: {
      currency: 'USD',
      amount: '',
      winners: 1,
    },
    timeline: {
      expiration_date: '',
      estimated_completion: {
        days: 0,
        hours: 0,
        minutes: 0,
      },
    },
    hasImpactCertificate: false,
    impactBriefMessage: '',
    sdgs: [],
    has_backer: false,
    backer: {
      name: '',
      logo: '',
      message: '',
    },
    terms_accepted: false,
  },
  stepValidation: {
    0: false,
    1: false,
    2: false,
  },
  data: null,
};

const bountySlice = createSlice({
  name: 'bounty',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
    updateNestedFormData: (state, action) => {
      const { path, value } = action.payload;
      const keys = path.split('.');
      let current = state.formData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
    },
    setStepValidation: (state, action) => {
      const { step, isValid } = action.payload;
      state.stepValidation[step] = isValid;
    },
    resetForm: (state) => {
      state.currentStep = 0;
      state.formData = initialState.formData;
      state.stepValidation = initialState.stepValidation;
    },
    nextStep: (state) => {
      if (state.currentStep < 2) {
        state.currentStep += 1;
      }
    },
    previousStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    setData: (state, action) => {
      state.data = action.payload;
    }
  },
});

export const {
  setCurrentStep,
  updateFormData,
  updateNestedFormData,
  setStepValidation,
  resetForm,
  nextStep,
  previousStep,
  setData,
} = bountySlice.actions;

export default bountySlice.reducer;
