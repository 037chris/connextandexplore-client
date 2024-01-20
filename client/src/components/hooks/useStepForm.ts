import React, { useState } from 'react';

export function useStepForm(steps: React.ReactNode[], validationFunctions: (() => boolean)[] = []) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function onNext() {
    setCurrentStepIndex(i => {
      if (i >= steps.length - 1) return i;

      return i + 1;
    })
  }

  function onBack() {
    setCurrentStepIndex((i) => (i > 0 ? i - 1 : i));
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    onNext,
    onBack,
  };
}
