import { ADD_WIDGET, REMOVE_WIDGET, TOGGLE_WIDGET_VISIBILITY } from "./actions";

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_WIDGET_VISIBILITY:
      return {
        ...state,
        categories: state.categories.map((category) => 
          (category.name === action.payload.categoryName) 
            ? {
              ...category,
              widgets: category.widgets.map((widget) =>
                widget.name === action.payload.widgetName
                  ? { ...widget, visible: !widget.visible }
                  : widget
              ),
          }
          : category
        ),
      };
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
