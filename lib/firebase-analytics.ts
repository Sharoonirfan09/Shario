import { firebaseConfig } from "@/lib/firebase-config";

let analytics: Promise<import("firebase/analytics").Analytics | undefined> | undefined;

/**
 * Firebase Analytics, loaded on demand rather than imported at the top of
 * the module. `components/firebase-analytics.tsx` renders on every public
 * page, so a static `import "firebase/analytics"` here would have shipped
 * the whole SDK (plus `firebase/app`) to every visitor even though
 * Analytics is currently inert (`measurementId` unset — see
 * `lib/firebase-config.ts`). Checking that *before* the dynamic `import()`
 * means the browser fetches zero bytes of Firebase code at all while it
 * stays inert, and only a separate, async-loaded chunk once it's switched
 * on — never blocking the initial page bundle either way.
 *
 * Needs a browser (indexedDB, cookies) and a real `measurementId` — both
 * unavailable during server rendering and until Analytics is enabled for
 * this Firebase project in the console (Project settings → Integrations).
 * Call this from a client component's effect; it resolves to `undefined`
 * rather than throwing when either precondition isn't met.
 */
export function getFirebaseAnalytics() {
  if (!analytics) {
    analytics =
      typeof window === "undefined" || !firebaseConfig.measurementId
        ? Promise.resolve(undefined)
        : (async () => {
            const [{ initializeApp, getApps, getApp }, { getAnalytics, isSupported }] =
              await Promise.all([import("firebase/app"), import("firebase/analytics")]);
            const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
            const supported = await isSupported();
            return supported ? getAnalytics(app) : undefined;
          })();
  }
  return analytics;
}
