import React from 'react';
import PropTypes from 'prop-types';

import { GridList } from '@material-ui/core';

import ItemCard from './ItemCard';

export default function List(props) {
  const { items } = props;

  return (
    <GridList cellHeight={250} cols={1}>
      {items.map(item => (
        <ItemCard item={item} key={item.id} />
      ))}
    </GridList>
  );
}

List.propTypes = {
  items: PropTypes.array.isRequired,
};
