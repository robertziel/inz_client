/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.Search';

export default defineMessages({
  filterButton: {
    id: `${scope}.filterButton`,
    defaultMessage: 'Search',
  },
  filterName: {
    id: `${scope}.filterName`,
    defaultMessage: 'Name',
  },
  filterPrice: {
    id: `${scope}.filterPrice`,
    defaultMessage: 'Price',
  },
  categoriesListHeader: {
    id: `${scope}.categoriesListHeader`,
    defaultMessage: 'Categories',
  },
});
