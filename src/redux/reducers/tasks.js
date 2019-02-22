import {
  TASKS_LOADING,
  TASKS_LOAD_SUCCEED,
  TASKS_LOAD_FAILED
} from "../actions/tasks";

const initialState = {
  requestState: null,
  items: [],
  itemsCount: null
};

export const tasksReduser = (state = initialState, { type, payload }) => {
  switch (type) {
    case TASKS_LOADING:
      return { ...state, requestState: "loading" };
    case TASKS_LOAD_SUCCEED:
      return {
        ...state,
        requestState: "succeed",
        items: payload.tasks,
        itemsCount: +payload.total_task_count
      };
    case TASKS_LOAD_FAILED:
      return {
        ...state,
        requestState: "error",
        items: []
      };

    default:
      return state;
  }
};
