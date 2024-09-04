import React from 'react';

interface SpacerProps {
  size?: string; // Accepts a Tailwind size like 'mt-4', 'mt-8', etc.
}

const Spacer: React.FC<SpacerProps> = ({ size = "mt-4" }) => {
  return <div className={size} />;
};

export default Spacer;