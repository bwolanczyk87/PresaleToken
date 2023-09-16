import { render, screen } from '@testing-library/react';
import ModalConnectingState from '@/components/Modals/ModalProgressStates/ModalConnectingState/ModalConnectingState';

// test props
const modalProps = {
  connectionRequestText: 'Please approve the transaction request in your wallet.',
  titleText: 'Requesting connection',
};

describe('ModalConnectingState', () => {
  const connectionRequestText = 'Please approve the transaction request in your wallet.';
  it('should render the title text', () => {
    const titleText = 'Requesting connection';
    render(<ModalConnectingState {...modalProps} />);

    expect(screen.getByText(titleText)).toBeInTheDocument();
  });

  it('should render the connection request text', () => {
    render(<ModalConnectingState {...modalProps} />);

    expect(screen.getByText(connectionRequestText)).toBeInTheDocument();
  });

  it('should render the spinner icon when the component is in progress', () => {
    render(<ModalConnectingState {...modalProps} isInProgress />);

    expect(screen.getByAltText('spinner icon')).toBeInTheDocument();
  });

  it('should render the wallet approve icon when the component is not in progress', () => {
    render(<ModalConnectingState {...modalProps} isInProgress={false} />);

    expect(screen.getByAltText('icon')).toBeInTheDocument();
  });
});
