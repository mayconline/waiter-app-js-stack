import { useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import { Order } from '../../types/Order';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void;
}

export function OrdersBoard({
  icon,
  title,
  orders,
  onCancelOrder,
  onChangeOrderStatus,
}: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setSelectedOrder(order);
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleChangeOrderStatus() {
    if (!selectedOrder) return;

    setIsLoading(true);

    try {
      const status =
        selectedOrder.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

      await api.patch(`/orders/${selectedOrder._id}`, { status });

      toast.success(
        `O status do pedido da mesa ${selectedOrder.table} foi alterado!`,
      );
      onChangeOrderStatus(selectedOrder._id, status);
      setIsModalVisible(false);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCancelOrder() {
    if (!selectedOrder) return;

    setIsLoading(true);
    try {
      await api.delete(`/orders/${selectedOrder._id}`);

      toast.success(`O pedido da mesa ${selectedOrder.table} foi cancelado!`);
      onCancelOrder(selectedOrder._id);
      setIsModalVisible(false);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
        isLoading={isLoading}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders?.length})</span>
      </header>

      {!!orders?.length && (
        <OrdersContainer>
          {orders.map(order => (
            <button
              type="button"
              key={order._id}
              onClick={() => handleOpenModal(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
}
