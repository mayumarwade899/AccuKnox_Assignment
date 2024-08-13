
import { ADD_WIDGET, REMOVE_WIDGET } from "./actions";

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_WIDGET:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.name === action.payload.category
            ? {
                ...category,
                widgets: [...category.widgets, action.payload.widget],
              }
            : category
        ),
      };

    case REMOVE_WIDGET:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.name === action.payload.category
            ? {
                ...category,
                widgets: category.widgets.filter(
                  (widget) => widget.name !== action.payload.widgetName
                ),
              }
            : category
        ),
      };
    default:
      return state;
  }
};

export default rootReducer;
