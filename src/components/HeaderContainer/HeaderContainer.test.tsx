import { render, screen } from '@testing-library/react';
import HeaderContainer from './HeaderContainer';

describe('HeaderContainer', () => {
  it('renders the brand logo with the correct alt text', () => {
    render(<HeaderContainer />);
    const brandLogo = screen.getByAltText('brand logo');
    expect(brandLogo).toBeInTheDocument();
  });

  it('renders the WalletConnectButton', () => {
    render(<HeaderContainer />);
    const walletConnectButton = screen.getByText('Connect Wallet');
    expect(walletConnectButton).toBeInTheDocument();
  });
});
