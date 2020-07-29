import React, { useState, useCallback } from 'react';
import Select, { OptionsType, GroupedOptionsType, Styles } from 'react-select';

import { Container } from './styles';

interface SelectComponentProps {
  name: string;
  options: OptionsType<object> | GroupedOptionsType<object> | undefined;
  onChange(value: any): void;
  defaultValue?: any;
  label: string;
  placeholder: string;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  label,
  placeholder,
  name,
  options,
  onChange,
  defaultValue,
}: SelectComponentProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const customStyles = {
    control: () => ({
      display: 'flex',
      border: '3px solid transparent',
      borderRadius: 5,
      height: 56,
      fontWeight: 500,
      width: '100%',
      padding: '0 7px',
      color: '#999',
      borderColor: isFocused ? '#E02041' : '#dcdcdc',
      transition: 'border 0.2s',
    }),
    option: provided => ({
      ...provided,
      color: '#3c404a',
      padding: 10,
    }),
    singleValue: (provided: object) => {
      const color = '#3c404a';
      return { ...provided, color };
    },
  } as Styles;

  return (
    <Container isFocused={isFocused}>
      <p>{label}</p>
      <Select
        name={name}
        styles={customStyles}
        isSearchable={false}
        options={options}
        onChange={value => onChange(value)}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </Container>
  );
};

export default SelectComponent;
