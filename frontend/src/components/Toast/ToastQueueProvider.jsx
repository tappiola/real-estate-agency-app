import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ToastItem from './ToastItem.jsx';
import './ToastItem.style.scss';

export const ToastQueueContext = React.createContext();
const { Provider } = ToastQueueContext;

const DEFAULT_DURATION = 3000;

function ToastQueueProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'default', duration = DEFAULT_DURATION) => {
    const toast = {
      id: Date.now(), message, type, duration,
    };
    setToasts((currentToasts) => [toast, ...currentToasts]);
    console.log(toasts);
  };

  const handleRemove = (id) => {
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
