import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { MinimizeButtonProps } from './ConsoleTypes';
import { cn } from '../../utils/cn';
import './Console.css';

/**
 * MinimizeButton component for toggling the console state
 */
export const MinimizeButton: React.FC<MinimizeButtonProps> = ({ 
  isExpanded, 
  onClick, 
  className 
}) => {
  return (
    <button
      className={cn('minimize-btn', className)}
      onClick={onClick}
      aria-label={isExpanded ? 'Close console' : 'Open console'}
      title={isExpanded ? 'Close console' : 'Open console'}
    >
      <FontAwesomeIcon icon={isExpanded ? faChevronDown : faChevronUp} />
    </button>
  );
};
