import { Table } from 'evergreen-ui';
import { mockedOrders } from '../../../mock/mockedOrders';

export const OrdersSection = () => {
  return (
    <Table>
      <Table.Head>
        <Table.TextHeaderCell>Date</Table.TextHeaderCell>
        <Table.TextHeaderCell>Status</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body height={240}>
        {mockedOrders.map((order) => (
          <Table.Row
            key={order.id}
            isSelectable
            onSelect={() => alert(order.date_order)}
          >
            <Table.TextCell>
              {new Date(order.date_order).toDateString()}
            </Table.TextCell>
            <Table.TextCell>{order.status}</Table.TextCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
