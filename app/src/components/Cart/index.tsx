import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { api } from '../../services/api';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { OrderConfirmModal } from '../OrderConfirmModal';
import { Text } from '../Text';
import {
  Actions,
  Image,
  Item,
  ProductContainer,
  ProductDetails,
  QuantityContainer,
  Summary,
  TotalContainer,
} from './styles';

interface CartProps {
  selectedTable: string;
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onDecrementCartItem: (product: Product) => void;
  onConfirmOrder: () => void;
}

export function Cart({
  selectedTable,
  cartItems,
  onAddToCart,
  onDecrementCartItem,
  onConfirmOrder,
}: CartProps) {
  const [isOrderConfirmModalVisible, setIsOrderConfirmModalVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const total = cartItems.reduce(
    (acc, cartItem) => acc + cartItem.quantity * cartItem.product.price,
    0,
  );

  async function handleConfirmOrder() {
    setIsLoading(true);
    try {
      await api.post('/orders', {
        table: selectedTable,
        products: cartItems.map(cartItem => ({
          product: cartItem.product._id,
          quantity: cartItem.quantity,
        })),
      });

      setIsOrderConfirmModalVisible(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleOK() {
    onConfirmOrder();
    setIsOrderConfirmModalVisible(false);
  }

  return (
    <>
      <OrderConfirmModal
        visible={isOrderConfirmModalVisible}
        onClose={handleOK}
      />

      {cartItems?.length && (
        <FlatList
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.1.5:3001/uploads/${cartItem.product.imagePath}`,
                  }}
                />

                <QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity
                  style={{ marginRight: 24 }}
                  onPress={() => onAddToCart(cartItem.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onDecrementCartItem(cartItem.product)}
                >
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}
      <Summary>
        <TotalContainer>
          {cartItems?.length ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho esta vazio</Text>
          )}
        </TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
