import { store } from 'react-notifications-component';

import { getIntl } from 'containers/LanguageProvider/IntlCatcher';
import defaultSettings from 'containers/NotificationsSystem/defaultSettings';

import messages from './messages';

export function orderCreationSucceededNotify() {
  store.addNotification({
    ...defaultSettings,
    message: getIntl().formatMessage(messages.orderCreationSucceededNotify),
    type: 'success',
  });
}

export function orderCreationFailedNotify() {
  store.addNotification({
    ...defaultSettings,
    message: getIntl().formatMessage(messages.orderCreationFailedNotify),
    type: 'danger',
  });
}
