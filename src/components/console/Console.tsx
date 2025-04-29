import React, { useState } from 'react';
import { ConsoleProps } from './ConsoleTypes';
import { ConsoleTopBar } from './ConsoleTopBar';
import { ConsoleExpandedContent } from './ConsoleExpandedContent';
import { MinimizeButton } from './MinimizeButton';
import { cn } from '../../utils/cn';
import './Console.css';

/**
 * Console component that provides a collapsible interface for displaying
 * status information, project context, and quick access to tools
 */
export const Console: React.FC<ConsoleProps> = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleConsole = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className={cn('console-container', isExpanded && 'expanded', className)}>
        <ConsoleTopBar />
        <ConsoleExpandedContent />
      </div>

      <MinimizeButton
        isExpanded={isExpanded}
        onClick={toggleConsole}
      />

      <div id="notificationArea"></div>
    </>
  );
};
import { MinimizeButton } from './MinimizeButton';
import { cn } from '../../utils/cn';
import './Console.css';

/**
 * Console component that provides a collapsible interface for displaying
 * status information, project context, and quick access to tools
 */
export const Console: React.FC<ConsoleProps> = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleConsole = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className={cn('console-container', isExpanded && 'expanded', className)}>
        <ConsoleTopBar />
        <ConsoleExpandedContent />
      </div>

      <MinimizeButton
        isExpanded={isExpanded}
        onClick={toggleConsole}
      />

      <div id="notificationArea"></div>
    </>
  );
};
