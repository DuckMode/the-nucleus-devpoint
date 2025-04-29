import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronUp, 
  faChevronDown, 
  faTerminal, 
  faCompass, 
  faBook, 
  faBoxArchive, 
  faQuestionCircle,
  faChartSimple
} from '@fortawesome/free-solid-svg-icons';
import { cn } from '../utils/cn';

// Types
export interface ConsoleProps {
  className?: string;
}

export interface MinimizeButtonProps {
  isExpanded: boolean;
  onClick: () => void;
  className?: string;
}

export interface ConsoleTopBarProps {
  className?: string;
}

export interface ConsoleExpandedContentProps {
  className?: string;
}

// MinimizeButton Component
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

// ConsoleTopBar Component
export const ConsoleTopBar: React.FC<ConsoleTopBarProps> = ({ className }) => {
  const showNotification = (message: string) => {
    const notificationArea = document.getElementById('notificationArea');
    if (!notificationArea) return;
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notificationArea.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  return (
    <div className={cn('console-top-bar', className)}>
      <div>
        <FontAwesomeIcon icon={faChartSimple} className="mr-2" />
        <span>Metrics:</span>
        <span className="ml-2 status-ok">OK</span>
      </div>
      
      <div>
        <span>Project:</span>
        <span className="ml-2">MyWorkflowApp</span>
      </div>
      
      <div>
        <span>Complete:</span>
        <div className="ml-2 w-24 bg-gray-700 h-2 rounded-full inline-block align-middle">
          <div className="bg-blue-500 h-full rounded-full" style={{ width: '60%' }}></div>
        </div>
      </div>
      
      <div className="flex-grow"></div>
      
      <button 
        className="console-button" 
        onClick={() => showNotification('Terminal opened')}
      >
        <FontAwesomeIcon icon={faTerminal} />
        <span>Terminal</span>
      </button>
      
      <button 
        className="console-button" 
        onClick={() => showNotification('Navigate opened')}
      >
        <FontAwesomeIcon icon={faCompass} />
        <span>Navigate</span>
      </button>
      
      <button 
        className="console-button" 
        onClick={() => showNotification('Learn opened')}
      >
        <FontAwesomeIcon icon={faBook} />
        <span>Learn</span>
      </button>
      
      <button 
        className="console-button" 
        onClick={() => showNotification('Resources opened')}
      >
        <FontAwesomeIcon icon={faBoxArchive} />
        <span>Resources</span>
      </button>
      
      <button 
        className="console-button" 
        onClick={() => showNotification('Help opened')}
      >
        <FontAwesomeIcon icon={faQuestionCircle} />
        <span>Help</span>
      </button>
    </div>
  );
};

// ConsoleExpandedContent Component
export const ConsoleExpandedContent: React.FC<ConsoleExpandedContentProps> = ({ className }) => {
  return (
    <div className={cn('console-expanded-content', className)}>
      <div>Expanded Console Content - To be implemented in later sections</div>
    </div>
  );
};

// Main Console Component
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
