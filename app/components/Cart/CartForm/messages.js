/*
 * ProfilePage Messages
 *
 * This contains all the text for the ProfilePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Cart.OrderForm';

export default defineMessages({
  formStreet: {
    id: `${scope}.form.street`,
    defaultMessage: 'Street',
  },
  formZipCode: {
    id: `${scope}.form.zipCode`,
    defaultMessage: 'Zip code',
  },
  formCity: {
    id: `${scope}.form.city`,
    defaultMessage: 'City',
  },
  formCountry: {
    id: `${scope}.form.country`,
    defaultMessage: 'Country',
  },
  formPhone: {
    id: `${scope}.form.phone`,
    defaultMessage: 'Phone',
  },
  formAddress: {
    id: `${scope}.form.address`,
    defaultMessage: 'Address',
  },
  formButton: {
    id: `${scope}.form.button`,
    defaultMessage: 'Purchase',
  },
  orderCreationSucceededNotify: {
    id: `${scope}.form.orderCreationSucceededNotify`,
    defaultMessage: 'Order created',
  },
  orderCreationFailedNotify: {
    id: `${scope}.form.orderCreationFailedNotify`,
    defaultMessage: 'Your order could not be created',
  },
});
