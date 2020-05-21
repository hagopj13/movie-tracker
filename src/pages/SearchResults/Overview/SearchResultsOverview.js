import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import searchSelectors from 'store/search/search.selectors';

type Props = {
  searchQuery: string,
  totalResults: number,
};

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: theme.typography.fontWeightRegular,
  },
  bold: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export const SearchResultsOverview = (props: Props) => {
  const { searchQuery, totalResults } = props;

  const classes = useStyles();

  return (
    <Typography className={classes.root} variant="h6">
      Found
      <span className={classes.bold}>{` ${totalResults} `}</span>
      results for
      <span className={classes.bold}>{` ${searchQuery} `}</span>
    </Typography>
  );
};

const mapStateToProps = createStructuredSelector({
  searchQuery: searchSelectors.selectQuery,
  totalResults: searchSelectors.selectTotalResults,
});

export default connect(mapStateToProps)(SearchResultsOverview);
