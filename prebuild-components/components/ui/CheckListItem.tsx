import React from 'react';
import { CheckListItemProps } from '../../../ui-package/types';

export default function CheckListItem({ 
  children, 
  iconClassName = "w-6 h-6 text-green-500 flex-shrink-0",
  textClassName = "text-lg font-semibold leading-tight"
}: CheckListItemProps) {
  return (
    <li className="flex items-start gap-3">
      <svg 
        className={iconClassName} 
        fill="currentColor" 
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          fillRule="evenodd" 
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
          clipRule="evenodd" 
        />
      </svg>
      <span className={textClassName}>{children}</span>
    </li>
  );
}
