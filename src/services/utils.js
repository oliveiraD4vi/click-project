import { notification } from 'antd';

const AUTH = 'USER';

export function Notification(type, message) {
  const params = {
    message,
    duration: 0,
    placement: 'top'
  };

  switch (type) {
    case 'success': notification.success(params); break;
    case 'error': notification.error(params); break;
    default: notification.open(params); break;
  }
};

export const auth = {
  login(authData) {
    localStorage.setItem(AUTH, JSON.stringify(authData));
  },
  logout() {
    localStorage.removeItem(AUTH);
  },
  isAuthenticated() {
    if (localStorage.getItem(AUTH) !== null) return true;
    return false;
  },
  getToken() {
    const { token } = JSON.parse(localStorage.getItem(AUTH));
    return token;
  },
  getId() {
    const { userId } = JSON.parse(localStorage.getItem(AUTH));
    return userId;
  },
};
