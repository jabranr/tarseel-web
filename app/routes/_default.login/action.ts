import { parse } from '@conform-to/zod';
import { ActionFunctionArgs, json, redirect } from '@remix-run/cloudflare';
import { z } from 'zod';

const schema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Email is invalid'),
  password: z.string({ required_error: 'Password is required' }),
  redirectTo: z.string().optional()
});

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parse(formData, { schema });

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission, { status: 400 });
  }

  const response = await fetch(`${context.env.REST_API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission.value)
  });

  if (response.ok) {
    return redirect(submission.value.redirectTo || '/account/parcels', {
      headers: {
        'Set-Cookie': response.headers.get('Set-Cookie') || ''
      }
    });
  }

  return json(submission, { status: 400 });
}
