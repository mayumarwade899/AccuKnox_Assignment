export const addWidget = (category, widget) => ({
  type: ADD_WIDGET,
  payload: { category, widget },
});

export const removeWidget = (category, widgetName) => ({
  type: REMOVE_WIDGET,
  payload: { category, widgetName },
});

export const toggleWidgetVisibility = (categoryName, widgetName) => ({
  type: TOGGLE_WIDGET_VISIBILITY,
  payload: { categoryName, widgetName },
});

export const ADD_WIDGET = "ADD_WIDGET";
export const REMOVE_WIDGET = "REMOVE_WIDGET";
export const TOGGLE_WIDGET_VISIBILITY = "TOGGLE_WIDGET_VISIBILITY";
