import { render, screen } from '@testing-library/react';
import TstkBanner from './TstkBanner';

describe('TstkBanner', () => {
  it('renders the banner text correctly', () => {
    render(<TstkBanner />);
    const bannerText = screen.getByText('Now, to Get Rich In The Future');
    expect(bannerText).toBeInTheDocument();
  });

  it('renders the token title with the correct styles', () => {
    render(<TstkBanner />);
    const title = screen.getByText('TSTK');
    expect(title).toHaveStyle('color: rgb(147 51 234)');
  });

  it('renders the banner description text correctly', () => {
    render(<TstkBanner />);
    const descriptionText = screen.getByText(
      'TSTK is not just a DeFi token, it is the best DeFi token that you can invest in right now!'
    );
    expect(descriptionText).toBeInTheDocument();
  });
});
