import { Button, Container, Group, Image } from '@mantine/core';
import WalletConnectButton from '@/components/WalletConnectButton/WalletConnectButton';
import CartoonButton1 from '@/components/Menu/CartoonButton'

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
          <Image  maw={36} mx="auto" radius="md" src="/worm-shotgun.png" alt="Yupikayey motherfucker" />
        </div>
        {/* <CartoonButton1
          label="Home"
          onClick={() => alert('Home clicked!')}
        />
        <CartoonButton1
          label="Tekonomics"
          onClick={() => alert('Home clicked!')}
        />
        <CartoonButton1
          label="Presale"
          onClick={() => alert('Home clicked!')}
        /> */}
        <WalletConnectButton />
      </Group>
    </Container>
  </div>
);

export default HeaderContainer;
