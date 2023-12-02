import { parse } from '@conform-to/zod';
import { ActionFunctionArgs, json, redirect } from '@remix-run/cloudflare';
import { schema } from './schema';

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

  return response;
}
