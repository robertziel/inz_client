import { defineMessages } from 'react-intl';

export const scope = 'app.components.Cart';

export default defineMessages({
  mustSignInNotify: {
    id: `${scope}.notifications.mustSignInNotify`,
    defaultMessage: 'Must sign in to see cart',
  },
});
