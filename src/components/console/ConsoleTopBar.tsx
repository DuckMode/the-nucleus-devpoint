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
