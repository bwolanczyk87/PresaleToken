import { useBalance, useAccount } from 'wagmi';
import { useState, useEffect } from 'react';

/**
 * Hook to get matic and WM balance of the connected account.
 * Also returns methods to refetch these values.
 * @returns
 */
const useGetAccountBalances = (): {
  walletBalance: number;
  tokenBalance: number;
  refetchFlrBalance: () => void;
  refetchTokenBalance: () => void;
} => {
  const [walletBalance, setWalletBalance] = useState<{
    walletBalance: number;
    tokenBalance: number;
  }>({
    walletBalance: 0,
    tokenBalance: 0,
  });

  // get connected account
  const { address } = useAccount();

  // get account FLR balance
  const { data: walletData, refetch: refetchFlrBalance } = useBalance({
    address,
  });

  // get account balance
  const { data: tokenData, refetch: refetchTokenBalance } = useBalance({
    address,
    token: process.env.TOKEN_ADDRESS as `0x${string}` | undefined,
  });

  // account balances
  useEffect(() => {
    if (!walletData?.formatted || !tokenData?.formatted) return;
    setWalletBalance((prevState) => ({
      ...prevState,
      walletBalance: +walletData.formatted,
      tokenBalance: +tokenData.formatted,
    }));
  }, [walletData?.formatted, tokenData?.formatted]);

  return { ...walletBalance, refetchFlrBalance, refetchTokenBalance };
};

export default useGetAccountBalances;
