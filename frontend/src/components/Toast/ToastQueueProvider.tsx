import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ToastItem from './ToastItem';
import './ToastItem.style.scss';
import {Toast} from "../../types";
import {ToastTypes} from "../../constants";

// @ts-ignore
export const ToastQueueContext = React.createContext();
const { Provider } = ToastQueueContext;

const DEFAULT_DURATION = 3000;

const ToastQueueProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastTypes, duration = DEFAULT_DURATION) => {
    const toast = {
      id: Date.now(), message, type, duration
    };
    setToasts([toast, ...toasts]);
  };

  const handleRemove = (id: number) => {
    setToasts((currentToasts) => [...currentToasts.filter((toast) => toast.id !== id)]);
  };

  return (
    <Provider value={{ addToast, remove: handleRemove, toasts }}>
      {children}

      {createPortal((
        <div className="Toast-Container">
          <TransitionGroup>
            {toasts.map((toast) => (
              <CSSTransition
                key={toast.id}
                timeout={500}
                unmountOnExit
                classNames="Toast"
              >
                <ToastItem
                  {...toast}
                  onExpire={() => handleRemove(toast.id)}
                  onRemove={() => handleRemove(toast.id)}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      ),
      document.body)}

    </Provider>
  );
}

export default ToastQueueProvider;
