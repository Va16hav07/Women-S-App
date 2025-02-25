declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_FIREBASE_API_KEY: string;
      EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
      EXPO_PUBLIC_FIREBASE_PROJECT_ID: string;
      EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
      EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
      EXPO_PUBLIC_FIREBASE_APP_ID: string;
      EXPO_PUBLIC_TWILIO_ACCOUNT_SID: string;
      EXPO_PUBLIC_TWILIO_AUTH_TOKEN: string;
      EXPO_PUBLIC_TWILIO_PHONE_NUMBER: string;
    }
  }
}

export {};