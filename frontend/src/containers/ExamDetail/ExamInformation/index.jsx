/* eslint-disable no-unused-expressions */
/* eslint-disable no-useless-return */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import { Typography, Box, TextField, Button } from '@material-ui/core';
import useStyles from './index.style';
import apis from '../../../apis';
import constants from '../../../constants';
import LoadingPage from '../../../components/LoadingPage';

const PrepareExam = ({ examId }) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [contest, setContest] = useState();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleRedirectToExamTest = (contestToken) => {
    history.push(`/contest/${examId}/exam/test?token=${contestToken}`);
  };

  const handleCheckPassword = async () => {
    try {
      const res = await apis.contest.verifyPassword({ id: examId, password });
      const data = JSON.parse(res);
      if (data.status) {
        handleRedirectToExamTest(data.result.contest_token);
      } else {
        enqueueSnackbar(data.message || 'Check password failed', {
          variant: 'error',
        });
      }
    } catch (error) {
      enqueueSnackbar('Check password failed', {
        variant: 'error',
      });
    }
  };

  const fetchContest = async () => {
    const res = await apis.contest.getContest(examId);
    const data = JSON.parse(res);
    if (data && data.status) {
      const { contest: contestData } = data.result;
      setContest(contestData);
      setIsLoading(false);
    } else {
      enqueueSnackbar((data && data.message) || 'Fetch data failed', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchContest();
  }, []);

  const renderUpcomingStatus = () => {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Sắp diễn ra
        </Typography>
      </Box>
    );
  };
  const renderHappeningStatus = () => {
    return (
      <Box>
        <Box display="flex" mt={2}>
          {contest.is_lock && (
            <TextField
              size="small"
              id="outlined-basic"
              label="Nhập code"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          <Button
            style={{ marginLeft: 3 }}
            variant="contained"
            color="primary"
            size="medium"
            onClick={() => {
              contest.is_lock
                ? handleCheckPassword()
                : handleRedirectToExamTest();
            }}
          >
            Thi
          </Button>
        </Box>
      </Box>
    );
  };
  const renderEndedStatus = () => {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Đã kết thúc
        </Typography>
      </Box>
    );
  };
  const renderByStatus = () => {
    if (contest) {
      if (contest.status === constants.UPCOMING) return renderUpcomingStatus();
      if (contest.status === constants.HAPPENING)
        return renderHappeningStatus();
      if (contest.status === constants.ENDED) return renderEndedStatus();
    }

    return;
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Box className={classes.paper}>
        <Typography variant="subtitle1" gutterBottom>
          Tên: {contest && contest.title}
        </Typography>
        <Box display="flex">
          <Typography variant="subtitle1" gutterBottom>
            Mô tả: {(contest && contest.description) || ''}
          </Typography>
        </Box>
        <Box display="flex">
          <Typography variant="subtitle1" gutterBottom>
            Thời gian: {contest && contest.exam_time}(m)
          </Typography>
        </Box>

        {renderByStatus()}
      </Box>
    </>
  );
};

export default PrepareExam;
