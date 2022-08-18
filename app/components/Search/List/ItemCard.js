import React from 'react';
import PropTypes from 'prop-types';

import { Button, Card } from 'components/_ui-elements';
import { AddShoppingCart } from '@material-ui/icons';

import {
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  ListItem,
  List as UiList,
} from '@material-ui/core';

import ItemModal from './ItemModal';

export default function ListCard({ item }) {
  const [open, setOpen] = React.useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Card key={item.id}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item.name}
          </Typography>
          <Typography variant="price">{item.price} $</Typography>
          <UiList>
            {item.custom_fields.map(customField => (
              <ListItem key={customField.name}>
                {customField.name}: {customField.value}
              </ListItem>
            ))}
          </UiList>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={openModal}>
          <AddShoppingCart /> Select
        </Button>
      </CardActions>
      <ItemModal open={open} closeModal={closeModal} item={item} />
    </Card>
  );
}

ListCard.propTypes = {
  item: PropTypes.object.isRequired,
};
