import Script from "next/script";

/**
 * GA4, wired but inert until a real Measurement ID exists. Reads
 * `NEXT_PUBLIC_GA_MEASUREMENT_ID` (must be `NEXT_PUBLIC_`-prefixed — Next
 * only exposes prefixed vars to the client bundle, and gtag.js has to run in
 * the browser) and renders nothing at all when it's unset, exactly as it is
 * today: no script tag, no request, no console noise, no fake ID standing in
 * for a real one.
 *
 * To activate: create a GA4 property, copy its Measurement ID (looks like
 * `G-XXXXXXXXXX`, in GA4 under Admin → Data Streams → your web stream), and
 * set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the deployment environment (Vercel
 * dashboard → Project Settings → Environment Variables, or
 * `vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID`), then redeploy. No code
 * change needed beyond that.
 *
 * `strategy="afterInteractive"` — Next's own recommended loading strategy
 * for analytics: fetched after hydration rather than blocking first paint,
 * so this can't be what regresses the mobile performance pass elsewhere in
 * this audit.
 */
export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}

/**
 * Meta/Facebook Pixel, same inert-until-configured pattern as
 * `GoogleAnalytics` above. Reads `NEXT_PUBLIC_FB_PIXEL_ID` and renders
 * nothing when it's unset.
 *
 * To activate: find the Pixel ID in Meta Events Manager (Data Sources → your
 * pixel → Settings — a numeric ID, not the access token), set
 * `NEXT_PUBLIC_FB_PIXEL_ID` in the deployment environment the same way as
 * the GA4 variable above, then redeploy.
 */
export function FacebookPixel() {
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  if (!pixelId) return null;

  return (
    <>
      <Script id="fb-pixel-init" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- Meta's documented noscript fallback is a plain <img> pixel request, not a Next-optimizable image (and next/image doesn't render inside <noscript> anyway). */}
        <img
          height="1"
          width="1"
          alt=""
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
