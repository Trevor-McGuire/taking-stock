import React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";

const SwipeableTemporaryDrawer = ({ isOpen, toggleDrawer }) => {
  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <List>
        {[
          ["Home", <InboxIcon />, "/"],
          ["Stocks", <MailIcon />, "/Stocks"],
          ["Tickers", <MailIcon />, "/Tickers"]
        ].map(([text, icon, link], index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={link}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
    >
      {list}
    </SwipeableDrawer>
  );
};

export default SwipeableTemporaryDrawer;
