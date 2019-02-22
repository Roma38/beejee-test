export const TASKS_LOADING = "TASKS_LOADING";
export const TASKS_LOAD_SUCCEED = "TASKS_LOAD_SUCCEED";
export const TASKS_LOAD_FAILED = "TASKS_LOAD_FAILED";

export const tasksLoadStart = () => ({ type: TASKS_LOADING });

export const tasksLoadSucceed = tasks => ({
  type: TASKS_LOAD_SUCCEED,
  payload: tasks
});

export const tasksLoadFailed = () => ({
  type: TASKS_LOAD_FAILED,
});