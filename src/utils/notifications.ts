export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('Browser tidak mendukung notifikasi');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const sendNotification = (title: string, body: string): void => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: 'https://i.ibb.co/HLfD5wgf/dualite-favicon.png',
      badge: 'https://i.ibb.co/HLfD5wgf/dualite-favicon.png',
    });
  }
};

export const scheduleNotification = (habitName: string, time: string): void => {
  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

  if (scheduledTime < now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const timeUntilNotification = scheduledTime.getTime() - now.getTime();

  setTimeout(() => {
    sendNotification(
      'Pengingat Kebiasaan! 🎯',
      `Waktunya untuk: ${habitName}`
    );
  }, timeUntilNotification);
};
