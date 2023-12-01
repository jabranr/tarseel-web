import { parse } from '@conform-to/zod';
import { ActionFunctionArgs, json, redirect } from '@remix-run/cloudflare';
import { z } from 'zod';

const schema = z.object({
  type: z.string({ required_error: 'Parcel type is required' }),
  destination: z.string({ required_error: 'Destination is required' }),
  deliverBy: z.string({ required_error: 'Delivery timeframe is required' }),
  value: z.number({ required_error: "Provide item's estimated value" }),
  budget: z.number({ required_error: 'Provide your budget' }),
  weight: z.number({ required_error: "Provide item's weight" }),
  width: z
    .number({
      invalid_type_error: 'Provide item width in centimeters (cm)'
    })
    .optional(),
  height: z
    .number({
      invalid_type_error: 'Provide item height in centimeters (cm)'
    })
    .optional(),
  depth: z
    .number({
      invalid_type_error: 'Provide item depth in centimeters (cm)'
    })
    .optional(),
  description: z
    .string()
    .min(5, { message: 'Description is too short' })
    .optional()
});

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parse(formData, { schema });

  if (submission.intent !== 'submit' || !submission.value) {
    return json(submission, { status: 400 });
  }

  const response = await fetch(`${context.env.REST_API_URL}/api/parcels`, {
    method: 'POST',
    body: JSON.stringify(submission.value)
  });

  if (response.ok) {
    const { id } = await response.json<{ id: string }>();
    return redirect(`/parcels/${id}`);
  }

  return json(submission, { status: 400 });
}
