import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

let analytics: Promise<Analytics | undefined> | undefined;

/**
 * `getAnalytics()` needs a browser (indexedDB, cookies) and a real
 * `measurementId` — both unavailable during server rendering and inert
 * until Analytics is enabled for this Firebase project in the console
 * (Project settings → Integrations), which is what populates
 * `measurementId`. Call this from a client component's effect; it resolves
 * to `undefined` rather than throwing when either precondition isn't met.
 */
export function getFirebaseAnalytics() {
  if (!analytics) {
    analytics =
      typeof window === "undefined" || !firebaseConfig.measurementId
        ? Promise.resolve(undefined)
        : isSupported().then((supported) => (supported ? getAnalytics(app) : undefined));
  }
  return analytics;
}
