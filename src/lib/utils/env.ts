import AppConfig from '~/app.config';
import EnvConfig from '~/env.config';

const env = AppConfig.env || process.env.NODE_ENV;

export function getItem<T> (key: string): T | null {
  const envConfig: any = EnvConfig as any;
  if (env && envConfig[env] !== undefined && envConfig[env][key] !== undefined) {
    return envConfig[env][key] as T;
  }
  return null;
}

export function getBaseUrl (): string {
  const baseUrl = getItem<string>('baseUrl');
  return baseUrl || '';
};

export function isDevelopment (): boolean {
  return env === 'development';
};

export function isProduction (): boolean {
  return env === 'production';
};

export function getEnv (): string {
  return env || 'development';
};
