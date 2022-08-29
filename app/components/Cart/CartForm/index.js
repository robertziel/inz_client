import React, { useEffect, useState } from 'react';

import { Paper } from 'components/_ui-elements';

import FetchedContent from 'containers/FetchedContent';
import useApiFetcher from 'containers/BackendApiConnector/fetcher';

import Form from './Form';
import Wrapper from './Wrapper';

function CartForm({ onSuccess }) {
  const fetcher = useApiFetcher();

  const [user, setUser] = useState();

  const fetchData = () => {
    fetcher.get({
      path: '/profile',
      afterSuccess: (result) => setUser(result.profile),
    });
  };

  useEffect(() => fetchData(), []);

  return (
    <Wrapper>
      <Paper>
        <FetchedContent processing={user === undefined || fetcher.processing}>
          <Form user={user} onSuccess={onSuccess}/>
        </FetchedContent>
      </Paper>
    </Wrapper>
  );
}

export default CartForm;
