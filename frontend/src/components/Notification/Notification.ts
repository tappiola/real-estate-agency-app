import { useCallback, useContext, useEffect } from 'react';

import { processToast } from '../../store/notifier';
import { ToastQueueContext } from '../Toast';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { DEFAULT_DURATION } from '../Toast/ToastQueueProvider';

const Notification = () => {
    const { notifications } = useAppSelector(({ notifier }) => notifier);
    const dispatch = useAppDispatch();
    const onToastProcess = useCallback(() => dispatch(processToast()), [dispatch]);

    const { addToast } = useContext(ToastQueueContext);

    useEffect(() => {
        if (notifications.length > 0) {
            const { message, type, duration = DEFAULT_DURATION } = notifications[0];

            addToast(message, type, duration);
            onToastProcess();
        }
    }, [addToast, notifications, onToastProcess]);

    return null;
};

export default Notification;
