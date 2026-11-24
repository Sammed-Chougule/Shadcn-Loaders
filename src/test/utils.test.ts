import { describe, it, expect } from 'vitest';
import { copyToClipboard } from '../../lib/utils.ts';

describe('copyToClipboard', () => {
  it('resolves to a boolean', async () => {
    const result = await copyToClipboard('test text');
    expect(typeof result).toBe('boolean');
  });

  it('does not throw when copying empty string', async () => {
    const result = await copyToClipboard('');
    expect(typeof result).toBe('boolean');
  });

  it('copies longer text without throwing', async () => {
    const longText = 'A'.repeat(10000);
    const result = await copyToClipboard(longText);
    expect(typeof result).toBe('boolean');
  });
});
