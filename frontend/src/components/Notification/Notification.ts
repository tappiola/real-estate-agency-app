import { useContext, useEffect } from 'react';

import { processToast } from '../../redux/notifier';
import {ToastQueueContext} from "../Toast";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";

const Notification = () => {
  const { notifications } = useAppSelector(({ notifications }) => notifications);
  const dispatch = useAppDispatch();
  const onToastProcess = () => dispatch(processToast());

  const { addToast } = useContext(ToastQueueContext);

  useEffect(() => {
    if (notifications.length > 0) {
      const { message, type, duration = 0 } = notifications[0];

      addToast(message, type, duration);
      onToastProcess();
    }
  }, [notifications]);

  return null;
}

export default Notification;