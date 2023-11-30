import { logDevReady } from '@remix-run/cloudflare';
import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';
import * as build from '@remix-run/dev/server-build';
import { setEnvironment } from '~/environment.server';
import { Env } from '~/types/env';

if (process.env.NODE_ENV === 'development') {
  logDevReady(build);
}

declare module '@remix-run/server-runtime' {
  interface EnvVars {
    env: Env;
  }
  interface AppLoadContext extends EnvVars {}
}

export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext: (context) => {
    setEnvironment(context.env);
    return { env: context.env };
  },
  mode: build.mode
});
