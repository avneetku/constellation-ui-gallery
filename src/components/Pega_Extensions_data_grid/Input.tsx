import React from 'react';
import type {InputProps} from './interfaces';

const Input: React.FC<InputProps> = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: '5px',
        width: '100%',
        boxSizing: 'border-box',
        marginTop: '5px',
      }}
    />
  );
};

export default Input;
