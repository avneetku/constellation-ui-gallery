import React from 'react';
import type { HeaderProps } from './interfaces';

const Header: React.FC<HeaderProps> = ({ label }) => {
  return (
    <p style={{ color : '#000', fontSize : '22px', marginBottom: '10px', fontWeight : 'bold' }}> {label}</p>
  );
};

export default Header;
