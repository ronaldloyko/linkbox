import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import items from "./store/items";
import listeners from "./store/listeners";
import ui from "./store/ui";

const store = configureStore({
  reducer: {
    ui: ui.reducer,
    items: items.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(listeners.middleware);
  },
});

export default store;

export const useDispatch: () => typeof store.dispatch = useReduxDispatch;

export const useSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useReduxSelector;

export function useAction() {
  return {
    ...ui.actions,
    ...items.actions,
  };
}
