import { validateEmail, validatePhone } from '../script';
import { createConfetti } from '../script';

describe('Validation functions', () => {
  test('validateEmail returns true for valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  test('validateEmail returns false for invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false);
  });

  test('validatePhone returns true for valid phone', () => {
    expect(validatePhone('+71234567890')).toBe(true);
  });

  test('validatePhone returns false for invalid phone', () => {
    expect(validatePhone('123456')).toBe(false);
  });
});

describe('Confetti function', () => {
  test('creates 150 confetti elements', () => {
    createConfetti();
    const confettiElements = document.querySelectorAll('.confetti');
    expect(confettiElements.length).toBe(150);
  });
});