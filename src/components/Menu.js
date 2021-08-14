import React, { useState } from "react";
// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import InfoIcon from "@material-ui/icons/Info";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import "./Menu.css";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function Menu() {
  const classes = useStyles();
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setMenuOpen(open);
  };

  const handleHomeClick = () => {
    history.push("/");
  };

  const handleDashboardClick = () => {
    history.push("/dashboard");
  };

  const handlePostQuestionClick = () => {
    history.push("/questions");
  };

  const handleAboutClick = () => {
    history.push("/about");
  };

  const handleContactClick = () => {
    history.push("/contact");
  };

  const list = (
    <div
      //   className={clsx(classes.list, {
      //     [classes.fullList]: anchor === "top" || anchor === "bottom",
      //   })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button key="Home" onClick={handleHomeClick}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button key="Dashboard" onClick={handleDashboardClick}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button key="Question" onClick={handlePostQuestionClick}>
          <ListItemIcon>
            <LiveHelpIcon />
          </ListItemIcon>
          <ListItemText primary="Post Question" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="About" onClick={handleAboutClick}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button key="Contact Us" onClick={handleContactClick}>
          <ListItemIcon>
            <ContactPhoneIcon />
          </ListItemIcon>
          <ListItemText primary="Contact Us" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Button className="menu-btn" onClick={toggleDrawer(true)}>
        Menu
      </Button>
      <Drawer anchor="left" open={menuOpen} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
    </div>
  );
}
