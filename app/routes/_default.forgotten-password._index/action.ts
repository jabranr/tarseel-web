import { parse } from '@conform-to/zod';
import { ActionFunctionArgs, json, redirect } from '@remix-run/cloudflare';
import { z } from 'zod';

const schema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Email is invalid')
});

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parse(formData, { schema });

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission, { status: 400 });
  }

  const response = await fetch(
    `${context.env.REST_API_URL}/api/forgotten-password`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission.value)
    }
  );

  if (response.ok) {
    return redirect('/forgotten-password/success');
  }

  return json(submission, { status: 400 });
}
