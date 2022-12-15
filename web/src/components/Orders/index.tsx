import { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';
import { api } from '../../services/api';
import { Order } from '../../types/Order';
import { API_URL } from '../../utils/variables';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo(API_URL, {
      transports: ['websocket'],
    });

    socket.on('orders@new', order => {
      setOrders(prevState => prevState.concat(order));
    });
  }, []);

  useEffect(() => {
    api
      .get('/orders')
      .then(res => {
        setOrders(res.data);
      })
      .catch(err => {
        throw err;
      });
  }, []);

  const waiting = orders.filter(order => order.status === 'WAITING');
  const inProduction = orders.filter(order => order.status === 'IN_PRODUCTION');
  const done = orders.filter(order => order.status === 'DONE');

  function handleCancelOrder(orderId: string) {
    setOrders(prevState => prevState.filter(order => order._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders(prevState =>
      prevState.map(order =>
        order._id === orderId ? { ...order, status } : order,
      ),
    );
  }

  return (
    <Container>
      <OrdersBoard
        icon="🕑"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="🍳"
        title="Em preparacao"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </Container>
  );
}
