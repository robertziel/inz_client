import React from 'react';
import PropTypes from 'prop-types';

import { SelfBuildingSquareSpinner } from 'react-epic-spinners';
import { colors } from 'styles/constants';

import Wrapper from './Wrapper';

function FetchedContent(props) {
  const spinner = props.spinner || (
    <SelfBuildingSquareSpinner color={colors.main} size={40} />
  );

  const wrappedSpinner = <Wrapper>{spinner}</Wrapper>;

  return props.processing ? wrappedSpinner : props.children;
}

FetchedContent.propTypes = {
  children: PropTypes.array.isRequired,
  processing: PropTypes.bool.isRequired,
  spinner: PropTypes.element,
};

export default FetchedContent;