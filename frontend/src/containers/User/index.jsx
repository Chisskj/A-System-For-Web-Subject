import React, { useState } from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
import useStyles from './index.style';
import UserInformation from './UserInformation';
import ChangePassword from './ChangePassword';

const menus = [
  {
    id: 0,
    heading: 'Thông tin cá nhân',
    component: <UserInformation />,
  },
  {
    id: 1,
    heading: 'Thay đổi mật khẩu',
    component: <ChangePassword />,
  },
];

const User = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const renderTab = () => {
    const item = menus.find((el) => el.id === tab);
    return item && item.component;
  };

  return (
    <div>
      <Paper className={classes.tab}>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
        >
          {menus.map((el) => (
            <Tab label={el.heading} key={el.id} />
          ))}
        </Tabs>
      </Paper>
      {renderTab()}
    </div>
  );
};

export default User;
