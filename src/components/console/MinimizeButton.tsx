import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { MinimizeButtonProps } from './ConsoleTypes';
import { cn } from '../../utils/cn';
import './Console.css';

/**
 * MinimizeButton component for toggling the console's expanded/collapsed state
 */
export const MinimizeButton: React.FC<MinimizeButtonProps> = ({
  isExpanded,
  onClick,
  className,
}) => {
  return (
    <button
      className={cn('minimize-btn', className)}
      onClick={onClick}
      title={isExpanded ? 'Close Console' : 'Open Console'}
      aria-label={isExpanded ? 'Close Console' : 'Open Console'}
      aria-expanded={isExpanded}
    >
      {isExpanded ? (
        <FontAwesomeIcon icon={faChevronDown} data-testid="chevron-down-icon" />
      ) : (
        <FontAwesomeIcon icon={faChevronUp} data-testid="chevron-up-icon" />
      )}
    </button>
  );
};
