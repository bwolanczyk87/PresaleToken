import { Modal } from '@mantine/core';

interface AppModalProps {
  children: React.ReactNode;
  opened: boolean;
  close: () => void;
}

const AppModal: React.FC<AppModalProps> = ({ children, opened, close }) => (
  <Modal opened={opened} onClose={close} withCloseButton={false} centered size="sm" radius="md">
    <Modal.Body>{children}</Modal.Body>
  </Modal>
);

export default AppModal;
