import React, { Component } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

class UrlList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) {
      this.setState({ selected: this.props.selected });
    }
  }

  handleClick = (e) => {
    this.setState({ selected: e.currentTarget.id });
    this.props.onClick(e.currentTarget.id);
  };

  render() {
    return (
      <div style={{ margin: "auto", width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          subheader={<ListSubheader><span><strong>Play List</strong></span></ListSubheader>}
        >
          {this.props.nameList.map((name, index) => (
            <ListItemButton
              key={index}
              id={index}
              onClick={this.handleClick}
              selected={this.state.selected === index}
            >
              <ListItemText primary={name} />
            </ListItemButton>
          ))}
        </List>
      </div>
    )
  }
}

export default UrlList;