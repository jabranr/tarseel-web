import { Form, Link, useActionData } from '@remix-run/react';
import { useForm } from '@conform-to/react';
import Button from '~/components/Button';
import InputText from '~/components/InputText';
import InputCheckbox from '~/components/InputCheckbox';
import { action } from './action';

export { action };
export default function Signup() {
  const lastSubmission = useActionData<typeof action>();
  const [form, fields] = useForm({
    lastSubmission,
    shouldValidate: 'onBlur'
  });

  return (
    <Form
      action="/signup"
      method="POST"
      className="max-w-sm mx-auto flex flex-col space-y-8"
      {...form.props}
    >
      <InputText.Group>
        <InputText
          maxLength={255}
          label="First name"
          type="text"
          name="firstName"
          defaultValue={fields.firstName.defaultValue}
          error={fields.firstName.error}
          required
        />
        <InputText
          maxLength={255}
          label="Last name"
          type="text"
          name="lastName"
          defaultValue={fields.lastName.defaultValue}
          error={fields.lastName.error}
          required
        />
      </InputText.Group>
      <InputText
        maxLength={255}
        label="Email"
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
        helperText="Make it a strong one. At aleast 8 characters long."
        defaultValue={fields.password.defaultValue}
        error={fields.password.error}
        required
      />
      <InputCheckbox
        name="marketingPreference"
        helperText="Subscribe for special offers, announcements. You can unsubscribe anytime."
        defaultChecked={fields.marketingPreference.defaultValue}
        error={fields.marketingPreference.error}
      >
        Subscribe to our newsletters
      </InputCheckbox>
      <Button fill type="submit">
        Sign up
      </Button>
      <div className="text-center text-sm font-medium text-tarseel-black">
        Already have an account?
        <Link to="/login" className="underline hover:no-underline ml-2">
          Login
        </Link>
      </div>
    </Form>
  );
}
