import { defineMessages } from 'react-intl';

export const scope = 'app.containers.auth.SignUpPage';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Sign Up',
  },
  formEmail: {
    id: `${scope}.form.email`,
    defaultMessage: 'E-mail',
  },
  formPassword: {
    id: `${scope}.form.password`,
    defaultMessage: 'Password',
  },
  formPasswordConfirmation: {
    id: `${scope}.form.passwordConfirmation`,
    defaultMessage: 'Password confirmation',
  },
  formButton: {
    id: `${scope}.form.button`,
    defaultMessage: 'Sign in',
  },
  signedUpNotify: {
    id: `${scope}.notifications.signedUpNotify`,
    defaultMessage: 'You are signed up!',
  },
  signInButton: {
    id: `${scope}.buttons.signIn`,
    defaultMessage: 'I have account',
  },
});
