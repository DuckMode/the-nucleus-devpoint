/**
 * Type definitions for the Console component
 */

export interface ConsoleProps {
  /**
   * Optional className for additional styling
   */
  className?: string;
}

export interface MinimizeButtonProps {
  /**
   * Whether the console is expanded
   */
  isExpanded: boolean;
  /**
   * Function to toggle the console state
   */
  onClick: () => void;
  /**
   * Optional className for additional styling
   */
  className?: string;
}

export interface ConsoleTopBarProps {
  /**
   * Optional className for additional styling
   */
  className?: string;
}

export interface ConsoleExpandedContentProps {
  /**
   * Optional className for additional styling
   */
  className?: string;
}

export interface SidebarState {
  /**
   * Whether the left sidebar is visible
   */
  leftVisible: boolean;
  /**
   * Whether the right sidebar is visible
   */
  rightVisible: boolean;
}
