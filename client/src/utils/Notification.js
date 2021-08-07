export default function Notification(
  notificationSystem,
  level,
  title,
  message
) {
  const notification = notificationSystem.current;
  notification.addNotification({
    message: message,
    level: level,
    title: title,
  });
}
