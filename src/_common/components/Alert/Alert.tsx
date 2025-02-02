"use client";
import { Alert as MuiAlert, AlertProps as MuiAlertProps } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { FC } from 'react';

interface AlertProps extends Omit<MuiAlertProps, 'onClose' | 'sx'> {
    onClose?: () => void;
    position?: 'top' | 'bottom';
    sx?: SxProps<Theme>;
}

const Alert: FC<AlertProps> = ({ 
    onClose, 
    position = 'top',
    sx,
    ...props 
}) => {
    const positionStyles: SxProps<Theme> = position === 'top' ? {
        position: 'fixed',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'auto',
        minWidth: '300px',
        maxWidth: '90%',
        zIndex: 1500,
    } : {
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'auto',
        minWidth: '300px',
        maxWidth: '90%',
        zIndex: 1500,
    };

    return (
        <MuiAlert
            {...props}
            onClose={onClose ? () => onClose() : undefined}
            sx={{
                ...positionStyles,
                ...sx,
                boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.15)',
                transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                opacity: 1,
                '&.MuiAlert-root': {
                    animation: 'slideIn 0.3s ease-out'
                },
                '@keyframes slideIn': {
                    '0%': {
                        opacity: 0,
                        transform: 'translate(-50%, -20px)'
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'translate(-50%, 0)'
                    }
                }
            }}
        />
    );
};

export default Alert;