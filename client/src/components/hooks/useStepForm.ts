import React, { useEffect, useState, FormEvent } from "react";

export function useStepForm(
  steps: React.ReactNode[],
  validationFunctions: (() => boolean)[] = []
) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function onNext() {
    const isStepValid = validationFunctions[currentStepIndex]?.();

    if (isStepValid) {
      setCurrentStepIndex((i) => (i < steps.length - 1 ? i + 1 : i));
    } else {
      console.error(
        `Step ${currentStepIndex} is not valid. Please review and correct the form.`
      );
    }
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
