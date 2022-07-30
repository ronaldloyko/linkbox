import Hammer from "hammerjs";
import { MutableRefObject, useCallback, useEffect } from "react";
import { EVENT_NAME_PRESS } from "../data/constants";

export default function useOnPress(
  element: MutableRefObject<HTMLElement>,
  callback: (event: HammerInput) => void
) {
  const onPress = useCallback(
    (event: HammerInput) => {
      event.preventDefault();
      callback(event);
    },
    [callback]
  );

  useEffect(() => {
    if (!element.current) {
      return;
    }

    const observedElement = new Hammer(element.current, {
      touchAction: "auto",
    });

    observedElement.on(EVENT_NAME_PRESS, onPress);

    return () => {
      observedElement.off(EVENT_NAME_PRESS, onPress);
      observedElement.destroy();
    };
  }, [element, onPress]);
}
