import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faEdit } from "@fortawesome/free-solid-svg-icons";

library.add(faMinus, faEdit);

class Task extends Component {
  constructor(props) {
    super(props);
    let text = props.text;
    this.state = {
      text: text,
      isEditing: props.isEditing || false,
    };
    this.enableEdit = this.enableEdit.bind(this);
    this.disableEdit = this.disableEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitTask = this.onSubmitTask.bind(this);
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      text: e.target.value,
    });
    this.props.updateItem(this.state.text,this.props.index)
  };

  onSubmitTask = (e) => {
    e.preventDefault();
    if (this.state.task !== "") {
      this.setState({
        isEditing: false,
      });
      this.props.updateItem(this.state.text, this.props.index);
      //this.props.stopEditing(this.props.index)
      this.disableEdit();
    }
  };

  enableEdit() {
    this.setState({ isEditing: true });
    this.props.startEditing(this.props.index);
  }

  disableEdit() {
    this.setState({ isEditing: false });
    this.props.stopEditing(this.props.index);
  }

  render() {
    let { text, isEditing } = this.state;
    let textObject;
    if (isEditing) {
      textObject = (
        <form onSubmit={this.onSubmitTask}>
          <input
            name="taskInput"
            type="text"
            value={text}
            onChange={this.handleChange}
          />
          <button type="submit">
            <FontAwesomeIcon icon="edit" />
          </button>
        </form>
      );
    } else
      textObject = (
        <span>
          {text}
          <button className="btn" onClick={this.enableEdit}>
            <FontAwesomeIcon icon="edit" />
          </button>
        </span>
      );
    return (
      <li>
        {textObject}
        <button
          className="btn"
          onClick={() => {
            this.props.removeItem(this.props.id);
          }}
        >
          <FontAwesomeIcon icon="minus" />
        </button>
      </li>
    );
  }
}

export default Task;
