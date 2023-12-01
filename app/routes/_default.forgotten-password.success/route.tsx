import { Link } from '@remix-run/react';
import { IconCircleCheck } from '@tabler/icons-react';

export default function ForgottenPasswordSuccess() {
  return (
    <section className="max-w-md mx-auto flex flex-col space-y-8">
      <h1 className="text-3xl font-medium text-center flex items-center justify-center">
        <IconCircleCheck className="w-10 h-10 mr-2" />
        Check your email
      </h1>
      <div className="text-center text-tarseel-gray-dark">
        <p className="text-xl">
          If your email is registered with us then we've sent you a link to
          reset your password.
        </p>
        <p className="mt-8 text-sm">
          If you're still having problems{' '}
          <Link
            className="underline text-tarseel-primary hover:no-underline"
            to="/contact-us"
          >
            contact us
          </Link>
        </p>
      </div>
    </section>
  );
}
