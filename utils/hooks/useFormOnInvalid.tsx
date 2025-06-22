import { useState } from 'react';

export default function useFormOnInvalid() {
  const [validationError, setValidationError] = useState(false);

  const handleFormOnInvalidEvent = () => {
    setValidationError(true);
  };

  const onvalidReset = () => {
    setValidationError(false);
  };

  return {
    validationError,
    handleFormOnInvalidEvent,
    onvalidReset,
  };
}
