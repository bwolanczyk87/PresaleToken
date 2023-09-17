// __mocks__/connectkit.ts

interface ConnectKitButtonProps {
  children: (props: {
    isConnected: boolean;
    show: () => void;
    truncatedAddress: string;
    ensName: string;
  }) => React.ReactElement;
}

export const ConnectKitButton: {
  Custom: React.FC<ConnectKitButtonProps>;
} = {
  Custom: ({ children }) => {
    const isConnected = false;
    const show = jest.fn();
    const truncatedAddress = '';
    const ensName = '';

    return children({ isConnected, show, truncatedAddress, ensName });
  },
};
