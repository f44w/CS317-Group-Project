
import * as Notifications from 'expo-notifications';

export const sendNotification = async (header, description) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: header,
      body: description,
    },
    trigger: null,
  });
}