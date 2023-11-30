import { ActionFunctionArgs, json, redirect } from '@remix-run/cloudflare';
import { getTarseelSession } from '~/server/session.server';

export type SendParcelPayload = {
  destination: string;
  deliverBy: string;
  type: string;
  value: string;
  budget: string;
  weight: string;
  width?: string;
  height?: string;
  depth?: string;
  description?: string;
};

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries()) as SendParcelPayload;

  // TODO if anonymous user, create a session
  // redirect to login/signup page with link back to this page and prefill form

  const response = await fetch(`${context.env.REST_API_URL}/api/parcels`, {
    method: 'POST',
    body: JSON.stringify(data)
  });

  if (response.ok) {
    return redirect('/parcels');
  }

  if (response.status === 401) {
    const { getSession, commitSession } = getTarseelSession(context);
    const session = await getSession();

    if (!session.has('draft')) {
      session.set('draft', JSON.stringify(data));
    }

    return redirect('/login?redirect=/send-parcel', {
      headers: {
        'Set-Cookie': await commitSession(session)
      }
    });
  }

  // return with form error
  return json(
    { formError: 'Something went wrong', values: data },
    { status: 400 }
  );
}
