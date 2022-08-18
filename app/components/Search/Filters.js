import React, { Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import queryString from 'qs';

import { Divider } from '@material-ui/core';
import { Button } from 'components/_ui-elements';

import { apiGet, stringifyParams } from 'utils/fetchers';
import history from 'utils/history';

import { IntegerRangeField, StringField } from './filterFields';

import messages from './messages';

class Filters extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.params = queryString.parse(history.location.search.replace('?', ''));

    this.state = Object.assign(
      {
        categoryFiltersFields: [],
        price: this.params.price,
        name: this.params.name,
      },
      this.params.category_filters_values || {},
    );

    this.onSubmit = this.onSubmit.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  categoryFilterKey(categoryFilter) {
    return `category_filter_${categoryFilter.id}`;
  }

  componentDidMount() {
    this.fetchCategoryFields();
  }

  fetchCategoryFields() {
    apiGet({
      path: '/search/category_filters',
      params: { category_id: this.props.categoryId },
      afterSuccess: result => {
        this.setState(
          { categoryFiltersFields: result.category_filters },
          () => {
            this.fetchData();
          },
        );
      },
    });
  }

  fetchData() {
    const categoryFiltersValues = {};

    this.state.categoryFiltersFields.forEach(categoryFilterField => {
      const value = this.state[this.categoryFilterKey(categoryFilterField)];

      if (value !== undefined) {
        categoryFiltersValues[
          this.categoryFilterKey(categoryFilterField)
        ] = value;
      }
    });

    const params = {
      category_filters_values: categoryFiltersValues,
      price: this.state.price,
      name: this.state.name,
    };

    history.push({
      search: stringifyParams(params),
    });

    this.props.onSubmit(
      Object.assign(params, { category_id: this.props.categoryId }),
    );
  }

  onSubmit(event) {
    event.preventDefault();

    this.fetchData();
  }

  setValue(field, value) {
    this.setState({ [field]: value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <StringField
            fieldKey="name"
            label={this.props.intl.formatMessage(messages.filterName)}
            defaultValue={this.state.name}
            onChange={this.setValue}
          />
          <IntegerRangeField
            fieldKey="price"
            label={this.props.intl.formatMessage(messages.filterPrice)}
            defaultValue={this.state.price}
            onChange={this.setValue}
          />
          <Divider />
          <h3>Category related filters</h3>
          {this.state.categoryFiltersFields.map(categoryFilter => {
            switch (categoryFilter.datatype) {
              case 'string':
                return (
                  <StringField
                    key={categoryFilter.id}
                    fieldKey={this.categoryFilterKey(categoryFilter)}
                    label={categoryFilter.name}
                    defaultValue={
                      this.state[this.categoryFilterKey(categoryFilter)]
                    }
                    onChange={this.setValue}
                  />
                );
              case 'float':
                return (
                  <IntegerRangeField
                    key={categoryFilter.id}
                    fieldKey={this.categoryFilterKey(categoryFilter)}
                    label={categoryFilter.name}
                    defaultValue={
                      this.state[this.categoryFilterKey(categoryFilter)]
                    }
                    onChange={this.setValue}
                  />
                );
              default:
                return null;
            }
          })}
          <Divider />
          <Button type="submit">
            <FormattedMessage {...messages.filterButton} />
          </Button>
        </form>
      </div>
    );
  }
}

Filters.propTypes = {
  categoryId: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(Filters);
