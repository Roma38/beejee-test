import { createSignature } from './createSignature';

describe('createSignature', () => {
  it('should throw Error when token is not provided', () => {
    expect(() => createSignature({
      status: 0,
      email: 'example@example.com',
      text: 'Hello World?',
    })).toThrow();
  });

  it('should throw Error when token is not "beejee"', () => {
    expect(() => createSignature({
      status: 0,
      email: 'example@example.com',
      text: 'Hello World?',
      token: 'foo',
    })).toThrow();
  });

  it('should return correct signature for #1 object', () => {
    const signature = createSignature({
      token: 'beejee',
      status: 0,
      email: 'example@example.com',
      text: 'Hello World?',
    });

    expect(signature).toEqual('0c7a4a93d77985701a8b77531d4783f4');
  });

  it('should return correct signature for #2 object', () => {
    const signature = createSignature({
      text: 'Hello World?',
      token: 'beejee',
      email: 'example@example.com',
      status: 0,
    });

    expect(signature).toEqual('0c7a4a93d77985701a8b77531d4783f4');
  });

  it('should return correct signature for #3 object', () => {
    const signature = createSignature({
      text: 'Ivan',
      token: 'beejee',
      email: 'example@example.com',
      status: 0,
    });

    expect(signature).toEqual('0ea9031c32dbe43a204bae7f41adb892');
  });
});