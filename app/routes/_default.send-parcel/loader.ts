import { LoaderFunctionArgs, json } from '@remix-run/cloudflare';

import parcelTypes from '~/data/parcel-types.json';
import deliverBy from '~/data/deliverbies.json';
import { getTarseelSession } from '~/server/session.server';

export async function loader({ context }: LoaderFunctionArgs) {
  const { getSession, destroySession, commitSession } =
    getTarseelSession(context);
  const session = await getSession();

  let values;
  if (session.has('draft')) {
    values = JSON.parse(session.get('draft'));
    await destroySession(session);
  }

  return json(
    { parcelTypes, deliverBy, values }
    // {
    // headers: {
    //   'Set-Cookie': await commitSession(session)
    // }
    // }
  );
}
