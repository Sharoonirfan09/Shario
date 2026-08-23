"use client";

import { useEffect } from "react";
import { getFirebaseAnalytics } from "@/lib/firebase";

/**
 * Firebase Analytics (the traffic shown in the Firebase console), wired but
 * inert until Analytics is enabled for the project — same inert-until-set
 * shape as `GoogleAnalytics`/`FacebookPixel` in components/analytics.tsx,
 * except the gate lives in `getFirebaseAnalytics()` since initializing the
 * SDK (not just loading a script) is what has to be skipped, not just this
 * component's render.
 *
 * To activate: Firebase console → Project settings → Integrations → enable
 * Google Analytics (this mints `measurementId`), set
 * `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` in the deployment environment, then
 * redeploy. No code change needed beyond that.
 *
 * This is a second, separate GA4 stream from the fixed gtag.js tag
 * hardcoded in `app/layout.tsx`'s `<head>` (Measurement ID
 * `G-E9JDVQ7D8V`) — Firebase Analytics is GA4 under the hood, so running
 * both sends duplicate pageview events unless they share the same GA4
 * property. Point them at the same Measurement ID to avoid that, or only
 * activate one of the two.
 */
export function FirebaseAnalytics() {
  useEffect(() => {
    getFirebaseAnalytics();
  }, []);

  return null;
}
