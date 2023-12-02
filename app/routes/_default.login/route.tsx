import { Form, Link, useActionData, useLoaderData } from '@remix-run/react';
import { parse, useForm } from '@conform-to/react';
import Button from '~/components/Button';
import InputText from '~/components/InputText';
import { action } from './action';
import { schema } from './schema';
import { loader } from './loader';

export { loader, action };
export default function Login() {
  const { redirectTo } = useLoaderData<typeof loader>();
  const lastSubmission = useActionData<typeof action>();
  const [form, fields] = useForm({
    lastSubmission,
    shouldValidate: 'onBlur',
    onValidate({ formData }) {
      return parse(formData, { schema });
    }
  });

  return (
    <Form
      action="/login"
      method="POST"
      className="max-w-sm mx-auto flex flex-col space-y-8"
      {...form.props}
    >
      <InputText
        maxLength={255}
        label=" Email"
        type="email"
        name="email"
        defaultValue={fields.email.defaultValue}
        error={fields.email.error}
        required
      />
      <InputText
        maxLength={255}
        label="Password"
        type="password"
        name="password"
        defaultValue={fields.password.defaultValue}
        error={fields.password.error}
        required
      />
      <InputText type="hidden" name="redirectTo" value={redirectTo} />
      <Button fill type="submit">
        Login
      </Button>
      <div className="flex items-center space-x-2 justify-center text-sm">
        <Link
          to="/forgotten-password"
          className="underline font-medium text-tarseel-black hover:no-underline"
        >
          I don't know my password
        </Link>
        <span>&bull;</span>
        <Link
          to="/signup"
          className="underline font-medium text-tarseel-black hover:no-underline"
        >
          Sign up
        </Link>
      </div>
    </Form>
  );
}
