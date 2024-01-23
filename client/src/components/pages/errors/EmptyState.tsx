// EmptyState.tsx
import React from 'react';
import Heading from '../../html/Heading';

interface EmptyStateProps {
  title: string;
  subtitle: string;
  onClick?: () => void; // Optional onClick function
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle, onClick }) => {
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center font-titan">
      <Heading center title={title} />
      {subtitle && (
        <button
          className="
            font-light
            text-neutral-500
            border-2
            border-neutral-500
            rounded-md
            p-2
            my-2
            hover:bg-neutral-100
            transition
          "
          onClick={onClick}
          type="button"
        >
          {subtitle}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
