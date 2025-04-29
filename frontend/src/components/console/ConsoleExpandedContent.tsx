import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronUp,
  faTerminal, 
  faCompass, 
  faBook, 
  faBoxArchive,
  faChartSimple,
  faServer,
  faUsers,
  faMicrochip,
  faCodeBranch,
  faCode,
  faCodeCommit,
  faCodePullRequest
} from '@fortawesome/free-solid-svg-icons';
import { ConsoleExpandedContentProps } from './ConsoleTypes';
import { cn } from '../../utils/cn';
import './Console.css';

/**
 * ConsoleExpandedContent component for the expanded view of the console
 */
export const ConsoleExpandedContent: React.FC<ConsoleExpandedContentProps> = ({ className }) => {
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

  const toggleSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section && section.classList.contains('collapsible')) {
      section.classList.toggle('collapsed');
    }
  };

  return (
    <div className={cn('console-expanded-content', className)}>
      {/* Left Column */}
      <div className="expanded-left-col">
        {/* Stats Section */}
        <div id="statsSection" className="expanded-section collapsible">
          <strong onClick={() => toggleSection('statsSection')}>
            Stats
            <FontAwesomeIcon icon={faChevronUp} className="section-toggle-icon" />
          </strong>
          <div className="collapsible-content">
            <div className="stat-item">
              <div className="stat-item-label">
                <FontAwesomeIcon icon={faChartSimple} />
                <span>Metrics</span>
              </div>
              <div className="stat-item-value status-ok">OK</div>
            </div>
            <div className="stat-item">
              <div className="stat-item-label">
                <FontAwesomeIcon icon={faServer} />
                <span>Project Status</span>
              </div>
              <div className="stat-item-value status-ok">Active</div>
            </div>
            <div className="stat-item">
              <div className="stat-item-label">
                <span>Complete</span>
              </div>
              <div className="stat-item-value">
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-item-label">
                <FontAwesomeIcon icon={faUsers} />
                <span>Users</span>
              </div>
              <div className="stat-item-value">3</div>
            </div>
            <div className="stat-item">
              <div className="stat-item-label">
                <FontAwesomeIcon icon={faMicrochip} />
                <span>CPU</span>
              </div>
              <div className="stat-item-value">
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="expanded-section tools-column-section">
          <strong>Tools</strong>
          <div className="tools-column">
            <button 
              className="tool-button" 
              onClick={() => showNotification('Terminal opened')}
            >
              <FontAwesomeIcon icon={faTerminal} />
              <span>Terminal</span>
            </button>
            <button 
              className="tool-button" 
              onClick={() => showNotification('Navigate opened')}
            >
              <FontAwesomeIcon icon={faCompass} />
              <span>Navigate</span>
            </button>
            <button 
              className="tool-button" 
              onClick={() => showNotification('Learn opened')}
            >
              <FontAwesomeIcon icon={faBook} />
              <span>Learn</span>
            </button>
            <button 
              className="tool-button" 
              onClick={() => showNotification('Resources opened')}
            >
              <FontAwesomeIcon icon={faBoxArchive} />
              <span>Resources</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Area */}
      <div className="expanded-right-area">
        {/* Project Info Section */}
        <div className="expanded-section project-info-section">
          <strong>Project Info</strong>
          <div className="info-row">
            <div className="info-label">Name</div>
            <div>MyWorkflowApp</div>
          </div>
          <div className="info-row">
            <div className="info-label">Branch</div>
            <div>main</div>
          </div>
          <div className="info-row">
            <div className="info-label">Last Commit</div>
            <div>2h ago</div>
          </div>
          <div className="info-row">
            <button 
              className="git-button"
              onClick={() => showNotification('Git panel opened')}
            >
              <FontAwesomeIcon icon={faCodeBranch} />
              <span>Git</span>
            </button>
          </div>
        </div>

        {/* Git Status Section */}
        <div className="expanded-section git-status-section">
          <strong>Git Status</strong>
          <div className="status-item">
            <div className="status-item-header">
              <div className="status-item-label">Commits</div>
              <div className="status-item-value">24</div>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: '80%' }}></div>
            </div>
          </div>
          <div className="status-item">
            <div className="status-item-header">
              <div className="status-item-label">Pushes</div>
              <div className="status-item-value">18</div>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: '60%' }}></div>
            </div>
          </div>
          <div className="status-item">
            <div className="status-item-header">
              <div className="status-item-label">Branches</div>
              <div className="status-item-value">3</div>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: '30%' }}></div>
            </div>
          </div>
          <div className="status-item">
            <div className="status-item-header">
              <div className="status-item-label">Git Ratio</div>
              <div className="status-item-value">75%</div>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
