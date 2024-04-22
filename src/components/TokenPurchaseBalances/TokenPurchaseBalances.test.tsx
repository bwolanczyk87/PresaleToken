import { render, screen } from '@testing-library/react';
import TokenPurchaseBalances from '@/components/TokenPurchaseBalances/TokenPurchaseBalances';

const balanceProps = {
  walletBalance: 4.5,
  walletTokenBalance: 600,
  stagePrice: 0.000001,
  saleTokenAmount: 2.5,
  insufficientBalance: false,
};

describe('TokenPurchaseBalances', () => {
  it('should render the total price of purchase', () => {
    render(<TokenPurchaseBalances {...balanceProps} />);

    expect(
      screen.getByText(`${balanceProps.saleTokenAmount.toFixed(5)} FLR`)
    ).toBeInTheDocument();
  });

  it('should render the wallet Flr balance', () => {
    render(<TokenPurchaseBalances {...balanceProps} />);

    expect(
      screen.getByText(`${balanceProps.walletBalance.toFixed(5)} FLR`)
    ).toBeInTheDocument();
  });

  it('should render the wallet token balance', () => {
    render(<TokenPurchaseBalances {...balanceProps} />);

    expect(
      screen.getByText(`${balanceProps.walletTokenBalance.toFixed(5)} WM`)
    ).toBeInTheDocument();
  });

  it('should render the total price of purchase in red if the user has insufficient balance', () => {
    const insufficientBalance = true;

    render(<TokenPurchaseBalances {...{ ...balanceProps, insufficientBalance }} />);

    expect(screen.getByText(`${balanceProps.saleTokenAmount.toFixed(5)} FLR`)).toHaveStyle(
      'color: rgb(250, 82, 82)'
    );
  });

  it('should render the amount to pay text in red if the user has insufficient balance', () => {
    const insufficientBalance = true;

    render(<TokenPurchaseBalances {...{ ...balanceProps, insufficientBalance }} />);

    expect(screen.getByText('Amount to pay')).toHaveStyle('color: rgb(250, 82, 82)');
  });
});
