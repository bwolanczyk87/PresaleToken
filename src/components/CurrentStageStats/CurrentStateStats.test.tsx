import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrentStageStats from './CurrentStageStats';

// sample props
const sampleProps = {
  stageTokenPrice: 0.00064,
  stageTokenSupply: 1000000000000,
  maxTokensPerStage: 500000000000,
};

describe('CurrentStageStats Component', () => {
  it('renders the stage token supply', () => {
    render(<CurrentStageStats {...sampleProps} />);
    const supplyText = screen.getByText('Presale Supply:');
    expect(supplyText).toBeInTheDocument();
    expect(supplyText).toHaveTextContent('1,000,000,000,000 WM');
  });

  it('renders the maximum purchase amount', () => {
    render(<CurrentStageStats {...sampleProps} />);
    const maxAmountText = screen.getByText('Maximum purchase amount:');
    expect(maxAmountText).toBeInTheDocument();
    expect(maxAmountText).toHaveTextContent('100,000,000,000 WM');
  });

  it('renders the stage token price', () => {
    render(<CurrentStageStats {...sampleProps} />);
    const priceText = screen.getByText('Presale Price:');
    expect(priceText).toBeInTheDocument();
    expect(priceText).toHaveTextContent('0.00064 FLR');
  });
});
