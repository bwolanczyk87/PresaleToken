import { render, screen } from '@testing-library/react';
import ModalPurchaseDetails from '@/components/Modals/ModalProgressStates/ModalPurchaseDetails/ModalPurchaseDetails';

// test props
const detailsProp = {
  saleTokenAmount: 100,
  saleTokenQuantity: '13',
  walletBalance: 2.5,
  stagePrice: 0.00067,
};

describe('ModalPurchaseDetails', () => {
  it('should render the title text', () => {
    const titleText = 'Buy WM Tokens';
    render(<ModalPurchaseDetails {...detailsProp} />);

    expect(screen.getByText(titleText)).toBeInTheDocument();
  });

  it('should render the total price of purchase', () => {
    render(<ModalPurchaseDetails {...detailsProp} />);

    expect(screen.getByText(detailsProp.saleTokenAmount.toFixed(5))).toBeInTheDocument();
  });

  it('should render the wallet Flr balance', () => {
    render(<ModalPurchaseDetails {...detailsProp} />);

    expect(screen.getByText(detailsProp.walletBalance.toFixed(5))).toBeInTheDocument();
  });

  it('should render the token amount to be purchased', () => {
    render(<ModalPurchaseDetails {...detailsProp} />);

    expect(screen.getByText(detailsProp.saleTokenQuantity)).toBeInTheDocument();
  });

  it('should render the stage token price', () => {
    render(<ModalPurchaseDetails {...detailsProp} />);

    expect(screen.getByText(detailsProp.stagePrice.toFixed(5))).toBeInTheDocument();
  });

  it('should render the Flr icon', () => {
    render(<ModalPurchaseDetails {...detailsProp} />);

    expect(screen.getByAltText('matic icon')).toBeInTheDocument();
  });

  it('should render the WM icon', () => {
    render(<ModalPurchaseDetails {...detailsProp} />);

    expect(screen.getByAltText('tstk icon')).toBeInTheDocument();
  });
});
