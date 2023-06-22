/* eslint-disable no-useless-return */
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Paper, Tabs, Tab, Grid, Box, Typography } from '@material-ui/core';
import TabDetail from './TabDetail';
import useStyles from './index.style';
import apis from '../../apis';
import LoadingPage from '../../components/LoadingPage';

const menus = [
  { id: 0, heading: 'Tất cả cuộc thi' },
  { id: 1, heading: 'Đã tham gia' },
  { id: 2, heading: 'Đang diễn ra' },
  { id: 3, heading: 'Sắp diễn ra' },
  { id: 4, heading: 'Đã kết thúc' },
];

let contestsDefault = [];

const Home = () => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [contests, setContests] = useState([]);
  const [contestsJoined, setContestsJoined] = useState([]);

  const fetchContests = async () => {
    try {
      const data = await apis.contest.getContests();
      const data1 = JSON.parse(data);
      if (data1 && data1.status) {
        setContests(data1.result.data);
        contestsDefault = [...data1.result.data];
        setIsLoading(false);
      } else {
        enqueueSnackbar((data1 && data1.message) || 'Fetch data failed', {
          variant: 'error',
        });
      }
    } catch (error) {
      enqueueSnackbar('Fetch data failed', { variant: 'error' });
    }
  };

  const fetchContestsJoined = async () => {
    const data = await apis.contest.getContestsJoined();
    const data1 = JSON.parse(data);
    if (data1 && data1.status) {
      setContestsJoined(data1.result.contests);
    } else {
      enqueueSnackbar((data1 && data1.message) || 'Fetch data failed', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  const handleChangeTab = async (event, newValue) => {
    setTab(newValue);
    const date = new Date();
    try {
      if (newValue === 0) {
        setContests([...contestsDefault]);
        return;
      }
      if (newValue === 1) {
        if (contestsJoined.length <= 0) {
          await fetchContestsJoined();
        }
        return;
      }
      if (newValue === 2) {
        const newContests = contestsDefault.filter((el) => {
          if (el.endTime && new Date(el.endTime) < date) return false;
          return new Date(el.startTime) <= date;
        });
        setContests([...newContests]);
        return;
      }
      if (newValue === 3) {
        const newContests = contestsDefault.filter(
          (el) => new Date(el.startTime) > date,
        );
        setContests([...newContests]);
        return;
      }
      if (newValue === 4) {
        const newContests = contestsDefault.filter(
          (el) => el.endTime && new Date(el.endTime) < date,
        );
        setContests([...newContests]);
      }
    } catch (error) {
      enqueueSnackbar('An error occurred', { variant: 'error' });
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Box mb={1}>
        <Typography variant="h6" gutterBottom>
          Danh sách cuộc thi
        </Typography>
      </Box>
      <Paper className={classes.root}>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
        >
          {menus.map((el) => (
            <Tab label={el.heading} key={el.id}>
              {el.heading}
            </Tab>
          ))}
        </Tabs>
      </Paper>

      {tab === 1 ? (
        <Grid container spacing={3}>
          {contestsJoined.map((el) => (
            <TabDetail key={el.id} item={el} />
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {contests.map((el) => (
            <TabDetail item={el} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default Home;
