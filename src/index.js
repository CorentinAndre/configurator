import React from 'react';
import { render } from 'ink';
import MultiSelect from './components/MultiSelect';

const items = [
  { value: 0, label: 'Jean' },
  { value: 1, label: 'Paul' },
  { value: 2, label: 'Pierre' },
  { value: 3, label: 'Jacques' },
];

const Configurator = () => {
  return (
    <MultiSelect items={items} onSelect={selected => console.log(selected)} />
  );
};

render(<Configurator />);
