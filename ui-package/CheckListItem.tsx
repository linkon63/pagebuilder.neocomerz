import React from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { CheckListItemProps } from './types';

export default function CheckListItem({
    children,
    iconClassName = "w-5 h-5 text-green-500 flex-shrink-0 mt-1",
    textClassName = "text-zinc-800 text-md leading-6"
}: CheckListItemProps) {
    return (
        <li className="flex items-start gap-2">
            <BsCheckCircleFill className={iconClassName} />
            <span className={textClassName}>{children}</span>
        </li>
    );
}
