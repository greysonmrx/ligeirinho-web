import React, { useEffect } from 'react';
import { GoX } from 'react-icons/go';
import {
  IoIosCheckmarkCircle,
  IoIosInformationCircle,
  IoIosAlert,
} from 'react-icons/io';

import { useToast, ToastMessage } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const toastIconTypeVariations = {
  success: <IoIosCheckmarkCircle />,
  error: <IoIosAlert />,
  warn: <IoIosAlert />,
  info: <IoIosInformationCircle />,
};

const Toast: React.FC<ToastProps> = ({ message, style }: ToastProps) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container type={message.type} style={style}>
      <span />
      {toastIconTypeVariations[message.type || 'success']}
      <div>
        <strong>{message.title}</strong>
        <p>{message.description}</p>
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <GoX />
      </button>
    </Container>
  );
};

export default Toast;
