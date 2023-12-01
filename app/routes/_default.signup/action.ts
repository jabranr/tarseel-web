import { parse } from '@conform-to/zod';
import { ActionFunctionArgs, json, redirect } from '@remix-run/cloudflare';
import { z } from 'zod';
import { getTarseelSession } from '~/server/session.server';

const schema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(2)
    .max(255),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(2)
    .max(255),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Email is invalid')
    .max(255),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8)
    .max(255),
  marketingPreference: z.boolean().optional()
});

export async function action({ request, context }: ActionFunctionArgs) {
  const { getSession, commitSession } = getTarseelSession(context);
  const session = await getSession();
  const formData = await request.formData();
  const submission = parse(formData, { schema });

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission, { status: 400 });
  }

  const response = await fetch(`${context.env.REST_API_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission.value)
  });

  if (response.ok) {
    return redirect('/account/parcels', {
      headers: {
        'Set-Cookie': await commitSession(session)
      }
    });
  }
}
