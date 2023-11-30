import { LoaderFunctionArgs, json } from '@remix-run/cloudflare';

import parcelTypes from '~/data/parcel-types.json';
import deliverBy from '~/data/deliverbies.json';

export function loader({}: LoaderFunctionArgs) {
  return json({ parcelTypes, deliverBy });
}
