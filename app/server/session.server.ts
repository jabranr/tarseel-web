import {
  LoaderFunctionArgs,
  createCookieSessionStorage
} from '@remix-run/cloudflare';

export function getTarseelSession(context: LoaderFunctionArgs['context']) {
  return createCookieSessionStorage({
    cookie: {
      name: 'TARSEELSESSID',
      secrets: [context.env.SESSION_SECRET],
      sameSite: 'lax'
    }
  });
}
