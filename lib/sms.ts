import { Platform } from 'react-native';

const TWILIO_ACCOUNT_SID = process.env.EXPO_PUBLIC_TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.EXPO_PUBLIC_TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.EXPO_PUBLIC_TWILIO_PHONE_NUMBER;

export const sendEmergencySMS = async (
  contacts: { name: string; phone: string }[],
  location: { latitude: number; longitude: number }
) => {
  if (Platform.OS === 'web') {
    console.warn('SMS functionality is not available on web');
    return;
  }

  const message = `EMERGENCY ALERT: I need help! My current location is: https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

  try {
    const promises = contacts.map((contact) =>
      fetch('https://api.twilio.com/2010-04-01/Accounts/' + TWILIO_ACCOUNT_SID + '/Messages.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + btoa(TWILIO_ACCOUNT_SID + ':' + TWILIO_AUTH_TOKEN),
        },
        body: new URLSearchParams({
          To: contact.phone,
          From: TWILIO_PHONE_NUMBER,
          Body: message,
        }).toString(),
      })
    );

    await Promise.all(promises);
    return true;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return false;
  }
};