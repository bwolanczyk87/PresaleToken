import { render, screen } from '@testing-library/react';
import WalletConnectButton from './WalletConnectButton';

describe('WalletConnectButton', () => {
  test('should render a button with the correct button text', () => {
    render(<WalletConnectButton isFullWidth size="lg" text="My Button" />);

    const button = screen.getByRole('button');

    expect(button).toHaveStyle('background-color: rgb(202, 252, 54)');
    expect;
    expect(button).toHaveTextContent('My Button');
  });

  test('should render a button with the correct styles', () => {
    render(<WalletConnectButton isFullWidth size="lg" text="My Button" />);

    const button = screen.getByRole('button');

    expect(button).toHaveStyle('background-color: rgb(202, 252, 54)');
    expect(button).toHaveStyle('color: rgb(0, 0, 0)');
  });
});
