import { StatusBar } from 'expo-status-bar';
import { Modal } from 'react-native';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import { ModalContainer, OkButton } from './styles';

interface OrderConfirmModalProps {
  visible: boolean;
  onClose: () => void;
}

export function OrderConfirmModal({
  visible,
  onClose,
}: OrderConfirmModalProps) {
  return (
    <Modal visible={visible} animationType="fade">
      <StatusBar style="light" />

      <ModalContainer>
        <CheckCircle />
        <Text size={20} weight="600" color="#fff" style={{ marginTop: 12 }}>
          Pedido confirmado
        </Text>

        <Text color="#fff" opacity={0.9} style={{ marginTop: 4 }}>
          O pedido ja entrou na fila de execucao
        </Text>

        <OkButton onPress={onClose}>
          <Text color="#d73035" weight="600">
            Ok
          </Text>
        </OkButton>
      </ModalContainer>
    </Modal>
  );
}
