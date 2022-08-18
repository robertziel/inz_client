import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Divider } from '@material-ui/core';
import { Grid, Paper } from 'components/_ui-elements';

import { apiGet } from 'utils/fetchers';

import CategoriesList from './CategoriesList';
import Filters from './Filters';
import List from './List';

class Search extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.state = {
      items: [],
    };

    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(params) {
    apiGet({
      path: '/search',
      params,
      afterSuccess: result => {
        this.setState({ items: result.items });
      },
    });
  }

  render() {
    const { items } = this.state;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper topLine>
            <CategoriesList categoryId={this.props.categoryId} />
          </Paper>
          <Divider />
          <Paper>
            <Filters
              categoryId={this.props.categoryId}
              onSubmit={this.fetchData}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          {items.length ? <List items={items} /> : ''}
        </Grid>
      </Grid>
    );
  }
}

Search.propTypes = {
  categoryId: PropTypes.string,
};

export default Search;
