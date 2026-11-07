import Script from "next/script";

/**
 * The fixed Google tag (gtag.js), Measurement ID `G-E9JDVQ7D8V` — the one
 * GA4 stream every route reports to. Previously a raw `<script async src=…>`
 * plus an inline config `<script>` hardcoded at the top of `<head>` in
 * `app/layout.tsx`: `async` stops it blocking HTML *parsing*, but the tag
 * still downloaded and executed on the main thread as early as possible on
 * every route, ahead of the page's own render — a real Total Blocking Time
 * cost on the mobile CPU Lighthouse throttles against. `next/script`'s
 * `afterInteractive` is Next's own documented strategy for GA4 specifically:
 * it still fires once the page is interactive (so no pageview is lost) but
 * off the critical rendering path rather than racing it. Kept as one
 * instance, not env-var-gated like `FacebookPixel` below — there is exactly
 * one GA4 property and it should always report; don't reintroduce a second,
 * env-var-driven GA4 component alongside it.
 *
 * Now `lazyOnload` rather than `afterInteractive`: gtag.js is ~180KB, and
 * `afterInteractive` still requested it at high priority alongside the hero
 * photograph and fonts — Lighthouse flagged it as the bulk of "unused
 * JavaScript" and of desktop Total Blocking Time. `lazyOnload` waits for the
 * window `load` event / idle time, so it never competes with first render.
 * `gtag('config')` still sends the page_view once it runs; the only visits
 * lost are ones that leave before the page finishes loading.
 */
export function GoogleAnalytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-E9JDVQ7D8V"
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-E9JDVQ7D8V');`}
      </Script>
    </>
  );
}

/**
 * Google Tag Manager, container `GTM-KZ3SPTBH` (account "SHARIO", container
 * "shario.ae"). Loaded `lazyOnload` for the same reason as GA4 above: it
 * downloads once the page has finished loading, so it never competes with
 * the hero for bandwidth or adds to blocking time on mobile.
 *
 * GA4 deliberately stays installed directly (`GoogleAnalytics` above) rather
 * than as a tag inside this container. Don't add a GA4 Configuration / Google
 * tag for `G-E9JDVQ7D8V` in GTM while that component is mounted — every
 * pageview would be counted twice. Use GTM for everything else (ad pixels,
 * conversion tags, event tracking).
 *
 * Tags configured in GTM only start firing once a container version is
 * published in the GTM UI.
 */
const GTM_ID = "GTM-KZ3SPTBH";

export function GoogleTagManager() {
  return (
    <>
      <Script id="gtm-init" strategy="lazyOnload">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}

/**
 * Meta/Facebook Pixel, inert-until-configured: reads `NEXT_PUBLIC_FB_PIXEL_ID`
 * and renders nothing when it's unset.
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
      <Script id="fb-pixel-init" strategy="lazyOnload">
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
          className="hidden"
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
