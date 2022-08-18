/* eslint-disable react/jsx-props-no-spreading, indent */
import React from 'react';

import CardCore from '@material-ui/core/Paper';

import styled from 'styled-components';

const Card = styled(({ ...props }) => <CardCore {...props} />)`
  &.MuiPaper-root {
    box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
      0 1px 3px 0 rgba(63, 63, 68, 0.15);
    background-color: #ffffff;
    padding: 10px;
    border-radius: 0%;
    margin: 5px;
  }
`;

export { Card };
