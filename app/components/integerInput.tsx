import React, { useState, useEffect } from 'react';

interface IntegerInputProps {
  value: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

const IntegerInput = ({ value: initialValue, min, max, onChange }: IntegerInputProps) => {
    const [value, setValue] = useState('');
  
    useEffect(() => {
      setValue(initialValue.toString());
    }, [initialValue]);
  
    const [showWarning, setShowWarning] = useState(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      // Remove non-digit characters from the input
      const numericValue = inputValue.replace(/\D/g, '');
      setValue(numericValue);
      setShowWarning(false);
      onChange && onChange(parseInt(numericValue, 10));
    };
  
    const handleBlur = () => {
      let newValue = parseInt(value, 10);
  
      // Check for minimum value
      if (min !== undefined && newValue < min) {
        newValue = min;
        setShowWarning(true);
      }
  
      // Check for maximum value
      if (max !== undefined && newValue > max) {
        newValue = max;
        setShowWarning(true);
      }
  
      setValue(newValue.toString());
      onChange && onChange(newValue);
    };
  
    return (
      <div>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {showWarning && (
          <p style={{ color: 'red' }}>
            Please enter a value between {min} and {max}
          </p>
        )}
      </div>
    );
  };
  

export default IntegerInput;