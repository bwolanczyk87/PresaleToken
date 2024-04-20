import { render, screen } from '@testing-library/react';
import VmBanner from './VmBanner';

describe('VmBanner', () => {
  it('renders the banner text correctly', () => {
    render(<VmBanner />);
    const bannerText = screen.getByText('Now, to Get Rich In The Future');
    expect(bannerText).toBeInTheDocument();
  });

  it('renders the token title with the correct styles', () => {
    render(<VmBanner />);
    const title = screen.getByText('WM');
    expect(title).toHaveStyle('color: rgb(147 51 234)');
  });

  it('renders the banner description text correctly', () => {
    render(<VmBanner />);
    const descriptionText = screen.getByText(
      'WM is not just a DeFi token, it is the best DeFi token that you can invest in right now!'
    );
    expect(descriptionText).toBeInTheDocument();
  });
});
