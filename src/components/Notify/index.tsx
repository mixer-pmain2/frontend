import React from "react";

import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export const notifyType = {
    INFO: "info",
    SUCCESS: "success",
    WARNING: "warning",
    ERROR: "error"
}

const Notify = (type, message) => {
    return () => {
        switch (type) {
            case 'info':
                NotificationManager.info(message, "Инфо", 3000)
                break;
            case 'success':
                NotificationManager.success(message, "Успех", 3000);
                break;
            case 'warning':
                NotificationManager.warning(message, "Предупреждение", 3000);
                break;
            case 'error':
                NotificationManager.error(message, "Ошибка", 3000);
                break;
        }
    }
}

export const notifyWarning = (message) => Notify(notifyType.WARNING, message)()
export const notifySuccess = (message) => Notify(notifyType.SUCCESS, message)()
export const notifyInfo = (message) => Notify(notifyType.INFO, message)()
export const notifyError = (message) => Notify(notifyType.ERROR, message)()

export default Notify
