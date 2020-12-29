import React, { Component } from "react";
import Overview from "./components/Overview";

class App extends Component {
  constructor() {
    super();

    this.state = {
      task: "",
      tasks: [],
      editing: [],
    };

    this.updateItem = this.updateItem.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
    this.startEditing = this.startEditing.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      task: e.target.value,
    });
  };

  onSubmitTask = (e) => {
    e.preventDefault();
    if (this.state.task !== "") {
      this.setState({
        tasks: this.state.tasks.concat(this.state.task),
        editing: this.state.editing.concat(false),
        task: "",
      });
    }
  };

  updateItem(text, index) {
    let tasks = [...this.state.tasks];
    //let isEditing = [...this.state.editing]
    tasks[index] = text;
    //isEditing[index]=true;
    this.setState({
      tasks: tasks,
      //	editing: isEditing
    });
  }

  startEditing(index) {
    let isEditing = [...this.state.editing];
    isEditing[index] = true;
    this.setState({
      editing: isEditing,
    });
  }

  stopEditing(index) {
    let isEditing = [...this.state.editing];
    isEditing[index] = false;
    this.setState({
      editing: isEditing,
    });
  }

  removeItem = (delIndex) => {
    let filteredList = this.state.tasks.filter(
      (_item, index) => index !== delIndex
    );
    this.setState({
      tasks: filteredList,
    });
  };

  render() {
    const { task, tasks } = this.state;

    return (
      <div className="col-6 mx-auto mt-5">
        <form onSubmit={this.onSubmitTask}>
          <div className="form-group">
            <label htmlFor="taskInput">Enter task</label>
            <input
              onChange={this.handleChange}
              value={task}
              type="text"
              id="taskInput"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
          </div>
        </form>
        <Overview
          tasks={tasks}
          removeItem={this.removeItem}
          updateItem={this.updateItem}
          isEditing={this.state.editing}
          stopEditing={this.stopEditing}
          startEditing={this.startEditing}
        />
      </div>
    );
  }
}

export default App;
