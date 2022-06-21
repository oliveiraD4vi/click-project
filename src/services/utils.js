import { notification } from 'antd';

export function Notification (type, message) {
  switch (type) {
    case 'success': notification.success({ message }); break;
    case 'error': notification.error({ message }); break;
    default: notification.open({ message }); break;
  }
};
