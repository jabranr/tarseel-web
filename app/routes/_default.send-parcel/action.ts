import { ActionFunctionArgs, json, redirect } from '@remix-run/cloudflare';

type SendParcelPayload = {
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

  // const response = await fetch(`${context.env.REST_API_URL}/api/parcels`, {
  //   method: 'POST',
  //   body: JSON.stringify(data)
  // });

  // if (response.ok) {
  //   return redirect('/parcels');
  // }

  // return with form error
  return json(
    { formError: 'Something went wrong', values: data },
    { status: 400 }
  );
}
