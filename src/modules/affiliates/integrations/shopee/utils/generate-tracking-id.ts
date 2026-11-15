import { randomBytes } from 'crypto';

export function generateTrackingId(): string {
  return `mh${randomBytes(6).toString('hex').toUpperCase()}`;
}