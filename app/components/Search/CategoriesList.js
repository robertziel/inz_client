import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Divider } from '@material-ui/core';
import { Button, Grid } from 'components/_ui-elements';

import { apiGet } from 'utils/fetchers';

import messages from './messages';

class CategoriesList extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.state = {
      currentCategory: null,
      parentCategory: null,
      subcategories: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    apiGet({
      path: '/search/categories_list',
      params: { category_id: this.props.categoryId },
      afterSuccess: result => {
        this.setState({
          currentCategory: result.current_category,
          parentCategory: result.parent_category,
          subcategories: result.subcategories,
        });
      },
    });
  }

  renderHeader() {
    if (this.state.currentCategory) {
      return (
        <Grid>
          <h3>{this.state.currentCategory.name}</h3>
        </Grid>
      );
    }
    return (
      <Grid>
        <h3>
          <FormattedMessage {...messages.categoriesListHeader} />
        </h3>
      </Grid>
    );
  }

  renderHomePageButton() {
    if (this.props.categoryId) {
      return (
        <Grid>
          <Button href="/" variant="outlined">
            Back to main page
          </Button>
          <Divider />
        </Grid>
      );
    }

    return null;
  }

  renderParentCategoryButton() {
    if (this.state.parentCategory) {
      return (
        <Grid>
          <Button
            href={`/category/${this.state.parentCategory.id}`}
            variant="outlined"
          >
            Back to: {this.state.parentCategory.name}
          </Button>
          <Divider />
        </Grid>
      );
    }

    return null;
  }

  render() {
    return (
      <div>
        {this.renderHeader()}

        {this.renderHomePageButton()}

        {this.renderParentCategoryButton()}

        {this.state.subcategories.map(subcategory => (
          <Grid key={subcategory.id}>
            <Button href={`/category/${subcategory.id}`} variant="outlined">
              {subcategory.name}
            </Button>
          </Grid>
        ))}
      </div>
    );
  }
}

CategoriesList.propTypes = {
  categoryId: PropTypes.string,
};

export default CategoriesList;
