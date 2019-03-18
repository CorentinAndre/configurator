import React, { useState } from 'react';
import { render } from 'ink';
import Select from 'ink-select-input';
import MultiSelect from './components/MultiSelect';
import Boolean from './components/Boolean';

const frameworkChoice = {
  question: 'Which framework do you want to use ?',
  type: 'select',
  options: {
    items: [
      { value: 'react', label: 'React' },
      { value: 'noframework', label: 'No framework' },
    ],
  },
};

const storybookChoice = {
  question: 'With Storybook ?',
  type: 'boolean',
  options: {
    thuthy: 'Yes',
    falsy: 'No',
  },
};

const typescriptChoice = {
  question: 'With Typescript ?',
  type: 'boolean',
  options: {
    thuthy: 'Yes',
    falsy: 'No',
  },
};

const lintingChoice = {
  question: 'Add some linting tools ?',
  type: 'multi',
  options: {
    items: [
      { value: 'eslint', label: 'ESLint' },
      { value: 'prettier', label: 'Prettier' },
      { value: 'stylelint', label: 'StyleLint' },
    ],
  },
};

const testingChoice = {
  question: 'Which testing tool do you want to use ?',
  type: 'select',
  options: {
    items: [
      { label: 'Jest', value: 'jest' },
      { label: 'None', value: 'none' },
      // { label: 'Ava', value: 'ava' },
    ],
  },
};

const handleSelect = (step, setStep) => result => {
  console.log(step);
  console.log(result);
  // Do something with the result
  const nextStep = step + 1;
  setStep({
    step: 1,
  });
};

const result = {
  framework: null,
  storybook: null,
  typescript: null,
  linting: null,
  test: null,
};

const CurrentStep = ({ step, setStep }) => {
  switch (step) {
    case 1:
      return (
        <Select
          {...frameworkChoice.options}
          onSelect={handleSelect(step, setStep)}
        />
      );
    case 2:
      return (
        <Boolean
          question={typescriptChoice.question}
          {...typescriptChoice.options}
        />
      );
    case 3:
      return (
        <Boolean
          question={storybookChoice.question}
          {...storybookChoice.options}
        />
      );
    case 4:
      return <MultiSelect {...lintingChoice.options} />;
    case 5:
      return <Select {...testingChoice.options} />;
    default:
      return '';
  }
};

// 1. Select a framework or not (React or JS)
// 2. Storybook ? y / n
// 3. With or without Typescript ? y / n
// 4. Select linting ESlint, Prettier, Stylelint
// 5. Testing ? jest

const Configurator = () => {
  const [step, setStep] = useState(1);
  return (
    <>
      <CurrentStep step={step} setStep={setStep} />
    </>
  );
};

render(<Configurator />);
