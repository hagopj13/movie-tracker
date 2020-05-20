// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

type Props = {
  items: Array<{ id: number, name: string }>,
  selectedItems: number[],
  onItemClick: (id: number) => void,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(-1, 0, 0, -1),
    '& > *': {
      margin: theme.spacing(1, 0, 0, 1),
    },
  },
  chipLabel: {
    fontSize: 12,
  },
  selectedChip: {
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

const ChipList = (props: Props) => {
  const { items, selectedItems, onItemClick } = props;

  const classes = useStyles();

  const isItemSelected = (id: number) => selectedItems.includes(id);

  return (
    <div className={classes.root}>
      {items.map((item) => (
        <Chip
          key={item.id}
          className={isItemSelected(item.id) ? classes.selectedChip : null}
          classes={{ label: classes.chipLabel }}
          label={item.name}
          color={isItemSelected(item.id) ? 'primary' : 'default'}
          variant={isItemSelected(item.id) ? 'default' : 'outlined'}
          onClick={() => onItemClick(item.id)}
        />
      ))}
    </div>
  );
};

export default ChipList;
