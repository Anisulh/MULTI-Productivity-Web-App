import React from "react";
import TreeItem from "@mui/lab/TreeItem";

function ListTree({ workSpaces, lists, tasks, taskNode }) {
  let nodeID = 0;

  return (
    <>
      {Array.isArray(workSpaces) ? (
        workSpaces?.map((workSpace) => {
          const workSpaceList = lists.filter((list) => {
            return list.workSpace === workSpace._id;
          });
          nodeID++;
          return (
            <TreeItem
              key={workSpace._id}
              nodeId={nodeID.toString()}
              label={workSpace.name}
            >
              {workSpaceList?.map((list) => {
                const listTasks = tasks.filter((task) => {
                  return task.list === list._id;
                });
                nodeID++;
                return (
                  <TreeItem
                    key={list._id}
                    nodeId={nodeID.toString()}
                    label={list.name}
                  >
                    {listTasks?.map((task) => {
                      nodeID++;
                      taskNode[nodeID] = task._id;
                      return (
                        <TreeItem
                          key={task._id}
                          nodeId={nodeID.toString()}
                          label={task.taskName}
                        />
                      );
                    })}
                  </TreeItem>
                );
              })}
            </TreeItem>
          );
        })
      ) : (
        <TreeItem
          key={workSpaces._id}
          nodeId={nodeID.toString()}
          label={workSpaces.name}
        >
          {lists?.map((list) => {
            const listTasks = tasks.filter((task) => {
              return task.list === list._id;
            });
            nodeID++;
            return (
              <TreeItem
                key={list._id}
                nodeId={nodeID.toString()}
                label={list.name}
              >
                {listTasks?.map((task) => {
                  nodeID++;
                  taskNode[nodeID] = task._id;
                  return (
                    <TreeItem
                      key={task._id}
                      nodeId={nodeID.toString()}
                      label={task.taskName}
                    />
                  );
                })}
              </TreeItem>
            );
          })}
        </TreeItem>
      )}
    </>
  );
}

export default ListTree;
