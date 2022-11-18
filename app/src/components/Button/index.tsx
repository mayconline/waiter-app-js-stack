import { Text } from '../Text';
import { Container } from './styles';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  loading?: boolean;
}

export function Button({ children, loading, disabled, ...props }: ButtonProps) {
  return (
    <Container {...props} disabled={disabled || loading}>
      {!loading ? (
        <Text weight="600" color="#fff">
          {children}
        </Text>
      ) : (
        <ActivityIndicator color="#fff" />
      )}
    </Container>
  );
}
