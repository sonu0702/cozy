import { Toaster } from 'react-hot-toast';
import { IconCircleCheckFilled, IconCircleXFilled } from '@tabler/icons-react';

export default function ToastContainer({
  errorColor,
  successColor,
  textColor,
}: {
  errorColor: string;
  successColor: string;
  infoColor: string;
  textColor: string;
}) {
  return (
    <Toaster
      toastOptions={{
        position: `top-center`,
        duration: 4000,
        style: {
          maxWidth: '500px',
        },
        error: {
          style: {
            background: errorColor,
            color: textColor,
          },
          icon: <IconCircleXFilled />,
        },
        success: {
          style: {
            background: successColor,
            color: textColor,
          },
          icon: <IconCircleCheckFilled />,
        },
      }}
    />
  );
}
