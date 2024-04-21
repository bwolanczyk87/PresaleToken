import { Container, Group, Image } from '@mantine/core';
import WalletConnectButton from '@/components/WalletConnectButton/WalletConnectButton';
import dynamic from 'next/dynamic'
 
const NoSSR = dynamic(() => import('@/components/HeaderContainer/HeaderContainer'), { ssr: false })

/**
 * Header section component.
 * renders a brand logo and the wallet connect button
 * @returns
 */
const HeaderContainer: React.FC = () => (
  <div>
    <Container size="lg">
      <Group position="apart">
        <div>
          <Image maw={36} mx="auto" radius="md" src="/brandLogo.png" alt="brand logo" />
        </div>
        <WalletConnectButton />
      </Group>
    </Container>
    <NoSSR />
  </div>
);

export default HeaderContainer;
