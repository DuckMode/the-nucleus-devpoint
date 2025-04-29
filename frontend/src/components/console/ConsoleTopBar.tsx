import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTerminal, 
  faCompass, 
  faBook, 
  faBoxArchive, 
  faQuestionCircle,
  faChartSimple
} from '@fortawesome/free-solid-svg-icons';
import { ConsoleTopBarProps } from './ConsoleTypes';
import { cn } from '../../utils/cn';
import './Console.css';

/**
 * ConsoleTopBar component for the collapsed view of the console
 */
export const ConsoleTopBar: React.FC<ConsoleTopBarProps> = ({ className }) => {
  const showNotification = (message: string) => {
    const notificationArea = document.getElementById('notificationArea');
    if (!notificationArea) return;
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    notificationArea.appendChild(notification);
    
    // Remove notification after animation completes
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
        <div className="ml-2 progress-bar">
          <div className="progress-bar-fill" style={{ width: '60%' }}></div>
        </div>
      </div>
      
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
      
      <div className="flex-grow"></div>
      
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
