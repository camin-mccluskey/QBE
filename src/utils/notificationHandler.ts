import * as Notifications from 'expo-notifications';

// todo - this is the place we do the deep linking
export default function notificationHandler(notification: Notifications.Notification) {
  const { title } = notification.request.content;
  console.warn(title);
};
