import React from 'react';
import { render, screen } from '@testing-library/react';
import ModalErrorState from '@/components/Modals/ModalProgressStates/ModalErrorState/ModalErrorState';

describe('ModalErrorState', () => {
  it('should render the error icon', () => {
    render(<ModalErrorState />);

    expect(screen.getByAltText('error icon')).toBeInTheDocument();
  });

  it('should render the error title text', () => {
    const titleText = 'An error occurred';
    render(<ModalErrorState />);

    expect(screen.getByText(titleText)).toBeInTheDocument();
  });

  it('should render the error message text', () => {
    const errorMessageText = 'Your request was cancelled or something just did not work.';
    render(<ModalErrorState />);

    expect(screen.getByText(errorMessageText)).toBeInTheDocument();
  });
});
