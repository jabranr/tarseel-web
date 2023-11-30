import { Form, Link } from '@remix-run/react';
import Button from '~/components/Button';
import InputText from '~/components/InputText';

export default function Login() {
  return (
    <Form
      action="/login"
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
      <InputText
        maxLength={255}
        label="Password"
        type="password"
        name="password"
        required
      />
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
