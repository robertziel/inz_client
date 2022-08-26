import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Paper,
  Scroll,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from 'components/_ui-elements';

import useApiFetcher from 'containers/BackendApiConnector/fetcher';
import FetchedContent from 'containers/FetchedContent';

import messages from './messages';

function OrdersList() {
  const fetcher = useApiFetcher();
  const [orders, setOrders] = useState([]);
  const [count, setCount] = useState(0);

  // Pagination
  const [pagination, setPagination] = useState({ page: 0, rowsPerPage: 10 });

  const changePage = (event, newPage) => {
    setPagination({ page: newPage, rowsPerPage: pagination.rowsPerPage });
  };

  const changeRowsPerPage = (event) => {
    setPagination({ page: 0, rowsPerPage: event.target.value });
  };

  const fetchData = () => {
    fetcher.get({
      path: '/orders',
      params: {
        page: pagination.page + 1,
        per_page: pagination.rowsPerPage,
      },
      afterSuccess: (result) => {
        console.log(result);
        setCount(result.count);
        setOrders(result.orders);
      },
    });
  };

  useEffect(() => fetchData(), [pagination]);

  return (
    <Paper fullHeight noPadding pagination>
      <Scroll>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                {'ID'}
              </TableCell>
              <TableCell>
                {'Net Price'}
              </TableCell>
              <TableCell>
                {'Total price'}
              </TableCell>
              <TableCell>
                {'Status'}
              </TableCell>
              <TableCell>
                {'Created at'}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <FetchedContent tableRow processing={fetcher.processing}>
              {orders.map((order) => (
                <TableRow hover key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.total_price}</TableCell>
                  <TableCell>{order.total_taxed_price}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.created_at}</TableCell>
                </TableRow>
              ))}
            </FetchedContent>
          </TableBody>
        </Table>
      </Scroll>
      <TablePagination
        rowsPerPageOptions={[10, 15, 25]}
        component="div"
        count={count}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={changePage}
        onChangeRowsPerPage={changeRowsPerPage}
      />
    </Paper>
  );
}

export default OrdersList;
