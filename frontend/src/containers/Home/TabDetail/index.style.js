import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  media: {
    height: 140,
  },
  date: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
