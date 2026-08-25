import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "@/lib/firebase-config";

/**
 * `app` + `auth` only — this is what `components/admin-gate.tsx` (the
 * `/admin` route only) needs. Firebase Analytics lives in its own
 * `lib/firebase-analytics.ts` instead of here: that module is imported by
 * `FirebaseAnalytics`, which renders on every public page, and bundling
 * `firebase/auth` alongside it would have shipped the admin sign-in SDK to
 * every visitor. Keeping the two apart is what lets each ship only the
 * Firebase code its own page actually needs.
 */
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
