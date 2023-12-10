import React, { ReactElement, useState } from 'react'

export function useStepForm( steps: ReactElement[]) {
    const [ currentStepIndex, setCurrentStapIndex ] = useState(0);

    function onNext() {
        setCurrentStapIndex(i => {
            if (i >= steps.length - 1) return i;
            
            return i + 1;
        })
    }

    function onBack() {
        setCurrentStapIndex(i => {
            if (i <= 0) 
                return i;
         
            return i - 1;
        })

    }

    function goTo(index: number) {
        setCurrentStapIndex(index)
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
    
  }
}
