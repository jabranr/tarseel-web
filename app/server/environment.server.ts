import { Env } from '~/types/env';

export function setEnvironment(e: Env) {
  env = e;
}

export let env: Env;
