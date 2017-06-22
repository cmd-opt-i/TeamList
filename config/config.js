import { env } from '../project.config.js';

export default {
  sentryPublicDNS: 'https://c0fc566a867d492498d9b5e4f893ac87@sentry.io/169768',
  sentryConfig: {
    release: '0.0.1',
    environment: env
  }
};
