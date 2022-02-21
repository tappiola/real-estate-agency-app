import { useContext, useEffect } from 'react';

import { processToast } from '../../redux/Notifier';
import {ToastQueueContext} from "../Toast";
import {useAppDispatch, useAppSelector} from "../../redux/store";

function Notification() {
  const { notifications } = useAppSelector(({ notifications }) => notifications);
  const dispatch = useAppDispatch();
  const onToastProcess = () => dispatch(processToast());

  const { addToast } = useContext(ToastQueueContext);

  useEffect(() => {
    if (notifications.length > 0) {
      const { message, type, duration } = notifications[0];

      addToast(message, type, duration);
      onToastProcess();
    }
  }, [notifications]);

  return null;
}

export default Notification;
