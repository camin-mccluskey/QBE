import * as Notifications from 'expo-notifications';

const scheduleNotification = (seconds: number) => {
  const schedulingOptions = {
    content: {
      title: 'This is a notification',
      body: 'This is the body',
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      color: 'blue',
    },
    trigger: {
      seconds: seconds,
    },
  };
  Notifications.scheduleNotificationAsync(schedulingOptions);
};