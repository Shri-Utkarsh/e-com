import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const GlassCard = ({ children, className, ...props }) => {
    return (
        <div
            className={twMerge(
                clsx(
                    'backdrop-blur-md bg-white/5 border border-white/10 rounded-xl shadow-xl',
                    'transition-all duration-300 hover:bg-white/10 hover:border-white/20',
                    className
                )
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default GlassCard;
