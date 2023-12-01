import { LoaderFunctionArgs, json } from '@remix-run/cloudflare';

export function loader({ request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  return json({
    redirectTo: searchParams.get('redirectTo') || '/account/parcels'
  });
}
