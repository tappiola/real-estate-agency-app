import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { processToast } from '../../redux/NotifierReducer';
import {ToastQueueContext} from "../Toast";

function Notification() {
  const { notifications } = useSelector(({ notifications }) => notifications);
  const dispatch = useDispatch();
  const onToastProcess = () => dispatch(processToast());

  const { addToast } = useContext(ToastQueueContext);

  useEffect(() => {
    if (notifications.length > 0) {
      const { message, type, duration } = notifications[0];

      addToast(message, type, duration);
      onToastProcess();
    }
  }, [notifications]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = null;
    };
  }, []);

  return null;
}

export default Notification;
