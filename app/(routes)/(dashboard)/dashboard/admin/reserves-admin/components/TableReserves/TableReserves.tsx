import { formatPrice } from "@/lib/formatPrice";
import { TableReservesProps } from "./TableReserves.type";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export function TableReserves(props: TableReservesProps) {
  const { orders } = props;
  const totalAmount = orders.reduce((acc, booking) => {
    return acc + parseFloat(booking.totalAmount);
  }, 0);


  return (
    <Table>
      <TableCaption>Lista de todas las reservas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha de orden</TableHead>
          <TableHead>ID Cliente</TableHead>
          <TableHead>Vehículo</TableHead>
          <TableHead>Fecha inicio</TableHead>
          <TableHead>Fecha final</TableHead>
          <TableHead className="text-right">Monto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">
              {new Date(order.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="font-medium max-w-[100px] truncate">
              {order.userId}
            </TableCell>
            <TableCell className="font-medium truncate">
              {order.carName}
            </TableCell>
            <TableCell>
              {new Date(order.orderDate).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(order.orderEndDate).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
              {formatPrice(Number(order.totalAmount))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">
            {formatPrice(totalAmount)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
} 