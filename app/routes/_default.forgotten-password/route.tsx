import { Form, Link } from '@remix-run/react';
import Button from '~/components/Button';
import InputText from '~/components/InputText';
import { action } from './action';

export { action };
export default function ForgottenPassword() {
  return (
    <Form
      action="/forgotten-password"
      method="POST"
      className="max-w-sm mx-auto flex flex-col space-y-8"
    >
      <InputText
        maxLength={255}
        label=" Email"
        type="email"
        name="email"
        required
      />
      <Button fill type="submit">
        Reset password
      </Button>
      <div className="flex items-center space-x-2 justify-center text-sm">
        <Link
          to="/login"
          className="underline font-medium text-tarseel-black hover:no-underline"
        >
          Login
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
