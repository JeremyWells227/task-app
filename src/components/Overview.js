import React from "react";
import Task from "./Task";
import uniqid from "uniqid";
export default function Overview(props) {
  const removeItem = (id) => {
    let index = taskList.findIndex((item) => item.props.id === id);
    if (index !== -1) props.removeItem(index);
  };
  let taskList = props.tasks.map((item, index) => {
    let uid = uniqid();
    let isEditing = props.isEditing[index];
    return (
      <Task
        key={uid}
        id={uid}
        text={item}
        removeItem={removeItem}
        updateItem={props.updateItem}
        index={index}
        isEditing={isEditing}
        stopEditing={props.stopEditing}
        startEditing={props.startEditing}
      />
    );
  });
  return <ul>{taskList}</ul>;
}
