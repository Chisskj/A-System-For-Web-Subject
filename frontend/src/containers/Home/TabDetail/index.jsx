/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import {
  Grid,
  Card,
  CardHeader,
  Avatar,
  Typography,
  CardMedia,
  CardActions,
  Box,
  Button,
} from '@material-ui/core';
import { AccessTime as AccessTimeIcon } from '@material-ui/icons';
import useStyles from './index.style';

const TabDetail = ({ item }) => {
  const history = useHistory();
  const classes = useStyles();

  const handleJoin = (e) => {
    e.preventDefault();
    history.push(`/contest/${item.id}/exam/detail`);
  };

  return (
    <Grid item xs={4} key={item.id}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            item.created_by.avatar ? (
              <Avatar alt={item.created_by.name} src={item.created_by.avatar} />
            ) : (
              <Avatar aria-label="recipe" className={classes.avatar}>
                {item.created_by.name[0]}
              </Avatar>
            )
          }
          action={
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{
                marginTop: '20px',
              }}
            >
              {item.exam_time} phút
            </Typography>
          }
          title={item.title}
          subheader={`Tạo bởi: ${item.created_by.name}`}
        />
        <CardMedia
          className={classes.media}
          image={
            item.imageUrl ||
            'https://monamedia.co/wp-content/uploads/2020/02/javascript-la-gi.jpg'
          }
          title={item.title}
        />
        <CardActions>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            style={{
              width: '100%',
            }}
          >
            <Box display="flex" alignItems="center">
              <AccessTimeIcon
                style={{ marginRight: '5px' }}
                color="secondary"
                fontSize="small"
              />
              <Typography variant="body2" color="textSecondary" component="p">
                {item && moment(item.start_time).format('lll')}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="outlined" color="primary" onClick={handleJoin}>
                Tham gia
              </Button>
            </Box>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default TabDetail;
