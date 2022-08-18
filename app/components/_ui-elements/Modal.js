/* eslint-disable react/jsx-props-no-spreading, indent */
import React from 'react';

import ModalCore from '@material-ui/core/Modal';

import styled from 'styled-components';

const Modal = styled(({ fullHeight, fullHeightMinusHeader, ...props }) => (
  <ModalCore {...props} />
))`
  padding: 10px;
`;

export { Modal };
