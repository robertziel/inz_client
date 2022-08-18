import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, TextField } from 'components/_ui-elements';
import { AddShoppingCart } from '@material-ui/icons';
import { addToCart } from 'components/Cart/actions';
import { connect } from 'react-redux';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ItemModal({ open, closeModal, item, handleAddToCart }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [amount, setAmount] = React.useState(1);

  const onAddToCartClick = () => {
    handleAddToCart({ ...item, amount });
    closeModal();
  };

  if (item) {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={closeModal}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>{item.name}</h2>
          <TextField
            name="amount"
            label="Amount"
            type="number"
            margin="normal"
            variant="outlined"
            defaultValue={1}
            onChange={event => setAmount(event.target.value)}
          />
          <Button onClick={onAddToCartClick}>
            <AddShoppingCart /> Add to cart
          </Button>
        </div>
      </Modal>
    );
  }
  return null;
}
ItemModal.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    handleAddToCart: item => {
      dispatch(addToCart(item));
    },
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(ItemModal);
