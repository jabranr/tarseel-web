import { Form, Link } from '@remix-run/react';
import Button from '~/components/Button';
import InputText from '~/components/InputText';
import { action } from './action';

export { action };
export default function Signup() {
  return (
    <Form
      action="/signup"
      method="POST"
      className="max-w-sm mx-auto flex flex-col space-y-8"
    >
      <InputText.Group>
        <InputText
          maxLength={255}
          label="First name"
          type="text"
          name="firstName"
          required
        />
        <InputText
          maxLength={255}
          label="Last name"
          type="text"
          name="lastName"
          required
        />
      </InputText.Group>
      <InputText
        maxLength={255}
        label="Email"
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
        Sign up
      </Button>
      <div className="text-center text-sm">
        <Link
          to="/login"
          className="underline font-medium text-tarseel-black hover:no-underline"
        >
          Already have an account?
        </Link>
      </div>
    </Form>
  );
}
