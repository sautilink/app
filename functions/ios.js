const BUNDLE_ID = 'com.sautilink.app';
const STORE = 'https://apps.apple.com/';
export async function onRequestGet({request, env}) {
  const status = new URL(request.url).searchParams.has('status');
  const region = request.cf?.country?.toLowerCase();
  const country = /^[a-z]{2}$/.test(region || '') && region !== 'xx' ? region : 'us';
  let url = null;
  const id = String(env.APPLE_APP_ID || '');
  if (/^\d+$/.test(id)) {
    url = 'https://apps.apple.com/' + country + '/app/id' + id;
  } else {
    try {
      const lookup = new URL('https://itunes.apple.com/lookup');
      lookup.searchParams.set('bundleId', BUNDLE_ID);
      lookup.searchParams.set('country', country);
      lookup.searchParams.set('entity', 'software');
      const response = await fetch(lookup.toString(), {signal: AbortSignal.timeout(4000), headers:{Accept:'application/json'}, cf:{cacheTtl:300,cacheEverything:true}});
      if (response.ok) {
        const data = await response.json();
        const match = data.results?.find(app => app.bundleId === BUNDLE_ID && /^\d+$/.test(String(app.trackId)));
        if (match) url = 'https://apps.apple.com/' + country + '/app/id' + match.trackId;
      }
    } catch { /* Apple unavailable: keep safe official store fallback. */ }
  }
  const headers = {'Cache-Control':'no-store','X-Robots-Tag':'noindex'};
  if (status) return Response.json({available:Boolean(url)}, {headers});
  return new Response(null,{status:302,headers:{...headers,Location:url || STORE}});
}
