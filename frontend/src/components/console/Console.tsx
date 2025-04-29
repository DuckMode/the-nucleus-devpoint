import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faColumns, 
  faTimes, 
  faPaperPlane 
} from '@fortawesome/free-solid-svg-icons';
import { ConsoleProps, SidebarState } from './ConsoleTypes';
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
  const [sidebarState, setSidebarState] = useState<SidebarState>({
    leftVisible: true,
    rightVisible: true
  });

  // Toggle console expanded/collapsed state
  const toggleConsole = () => {
    setIsExpanded(!isExpanded);
    
    // Reset Ask Nuc component position when toggling
    const askNucComponent = document.getElementById('askNucComponent');
    if (askNucComponent) {
      askNucComponent.style.left = '50%';
      askNucComponent.style.transform = 'translateX(-50%) translateY(0)';
      askNucComponent.classList.remove('dragging');
    }
  };

  // Open sidebar toggle modal
  const openSidebarModal = () => {
    const modal = document.getElementById('sidebarModal');
    if (modal) {
      modal.classList.add('visible');
    }
  };

  // Close sidebar toggle modal
  const closeSidebarModal = () => {
    const modal = document.getElementById('sidebarModal');
    if (modal) {
      modal.classList.remove('visible');
    }
  };

  // Handle sidebar toggle
  const handleSidebarToggle = (target: 'left' | 'right' | 'both') => {
    const leftSidebar = document.getElementById('sidebarLeft');
    const rightSidebar = document.getElementById('sidebarRight');
    
    let newState = { ...sidebarState };
    
    if (target === 'left' || target === 'both') {
      newState.leftVisible = !newState.leftVisible;
      if (leftSidebar) {
        leftSidebar.classList.toggle('hidden', !newState.leftVisible);
      }
    }
    
    if (target === 'right' || target === 'both') {
      newState.rightVisible = !newState.rightVisible;
      if (rightSidebar) {
        rightSidebar.classList.toggle('hidden', !newState.rightVisible);
      }
    }
    
    setSidebarState(newState);
    closeSidebarModal();
    
    // Show notification
    const message = `${target === 'both' ? 'Both sidebars' : target === 'left' ? 'Left sidebar' : 'Right sidebar'} ${
      target === 'both' 
        ? (newState.leftVisible ? 'shown' : 'hidden')
        : target === 'left'
          ? (newState.leftVisible ? 'shown' : 'hidden')
          : (newState.rightVisible ? 'shown' : 'hidden')
    }`;
    
    const notificationArea = document.getElementById('notificationArea');
    if (notificationArea) {
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.textContent = message;
      
      notificationArea.appendChild(notification);
      
      // Remove notification after animation completes
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  };

  // Make Ask Nuc component draggable
  const makeAskNucDraggable = (el: HTMLElement) => {
    let pos = { x: 0, y: 0 };
    let isDragging = false;
    
    const mouseDownHandler = (e: MouseEvent) => {
      // Only allow dragging on the component background, not on input or button
      if ((e.target as HTMLElement).tagName === 'INPUT' || 
          (e.target as HTMLElement).tagName === 'BUTTON' ||
          (e.target as HTMLElement).closest('button')) {
        return;
      }
      
      isDragging = true;
      el.classList.add('dragging');
      
      // Get the current mouse position
      pos.x = e.clientX;
      
      // Remove transform to use left property for positioning
      el.style.transform = 'translateY(0)';
      
      // Calculate the current left position considering the current transform
      const rect = el.getBoundingClientRect();
      el.style.left = `${rect.left}px`;
      
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
      
      e.preventDefault();
    };
    
    const mouseMoveHandler = (e: MouseEvent) => {
      if (!isDragging) return;
      
      // Calculate the new position
      const dx = e.clientX - pos.x;
      pos.x = e.clientX;
      
      // Update the element's position
      const currentLeft = parseInt(el.style.left || '0', 10);
      const newLeft = currentLeft + dx;
      
      // Optional: Add boundary checks here if needed
      const windowWidth = window.innerWidth;
      const elWidth = el.offsetWidth;
      const minLeft = 20;
      const maxLeft = windowWidth - elWidth - 20;
      
      el.style.left = `${Math.max(minLeft, Math.min(maxLeft, newLeft))}px`;
    };
    
    const mouseUpHandler = () => {
      isDragging = false;
      el.classList.remove('dragging');
      
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    
    el.addEventListener('mousedown', mouseDownHandler);
  };

  // Initialize draggable behavior for Ask Nuc component
  useEffect(() => {
    const askNucComponent = document.getElementById('askNucComponent');
    if (askNucComponent) {
      makeAskNucDraggable(askNucComponent);
    }
    
    // Initialize sidebar state
    const leftSidebar = document.getElementById('sidebarLeft');
    const rightSidebar = document.getElementById('sidebarRight');
    
    if (leftSidebar) {
      leftSidebar.classList.toggle('hidden', !sidebarState.leftVisible);
    }
    
    if (rightSidebar) {
      rightSidebar.classList.toggle('hidden', !sidebarState.rightVisible);
    }
    
    // Add click event listener to close modal when clicking outside
    const handleOutsideClick = (e: MouseEvent) => {
      const modal = document.getElementById('sidebarModal');
      const modalContent = document.querySelector('.modal-content');
      
      if (modal && modal.classList.contains('visible') && 
          modalContent && !modalContent.contains(e.target as Node)) {
        closeSidebarModal();
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [sidebarState]);

  return (
    <>
      <div className={cn('console-container', isExpanded && 'expanded', className)}>
        <ConsoleTopBar />
        <ConsoleExpandedContent />
        
        {/* Ask Nuc Component */}
        <div id="askNucComponent">
          <input 
            type="text" 
            placeholder="Ask Nuc..." 
            aria-label="Ask Nuc"
          />
          <button 
            onClick={() => {
              const input = document.querySelector('#askNucComponent input') as HTMLInputElement;
              if (input && input.value.trim()) {
                const notificationArea = document.getElementById('notificationArea');
                if (notificationArea) {
                  const notification = document.createElement('div');
                  notification.className = 'notification';
                  notification.textContent = `Asked: ${input.value}`;
                  
                  notificationArea.appendChild(notification);
                  
                  setTimeout(() => {
                    notification.remove();
                  }, 3000);
                }
                input.value = '';
              }
            }}
            aria-label="Send"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
      
      {/* Bottom Controls */}
      {isExpanded && (
        <div className="console-bottom-controls">
          <button 
            className="control-button"
            onClick={() => {
              const notificationArea = document.getElementById('notificationArea');
              if (notificationArea) {
                const notification = document.createElement('div');
                notification.className = 'notification';
                notification.textContent = 'Add block clicked';
                
                notificationArea.appendChild(notification);
                
                setTimeout(() => {
                  notification.remove();
                }, 3000);
              }
            }}
            aria-label="Add Block"
            title="Add Block"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          
          <button 
            className="control-button"
            onClick={openSidebarModal}
            aria-label="Toggle Sidebars"
            title="Toggle Sidebars"
          >
            <FontAwesomeIcon icon={faColumns} />
          </button>
        </div>
      )}
      
      {/* Minimize Button */}
      <MinimizeButton 
        isExpanded={isExpanded} 
        onClick={toggleConsole} 
      />
      
      {/* Notification Area */}
      <div id="notificationArea"></div>
      
      {/* Sidebar Toggle Modal */}
      <div id="sidebarModal" className="modal-overlay">
        <div className="modal-content">
          <h3 className="modal-title">Toggle Sidebars</h3>
          <button 
            className="modal-close-btn"
            onClick={closeSidebarModal}
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          
          <div className="modal-buttons">
            <button 
              className="modal-button"
              onClick={() => handleSidebarToggle('left')}
            >
              L
            </button>
            <button 
              className="modal-button"
              onClick={() => handleSidebarToggle('right')}
            >
              R
            </button>
            <button 
              className="modal-button"
              onClick={() => handleSidebarToggle('both')}
            >
              B
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
