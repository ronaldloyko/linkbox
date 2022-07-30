import {
  IonSegment,
  IonToolbar,
  type SegmentChangeEventDetail,
} from "@ionic/react";
import { FC, useEffect } from "react";
import { DEFAULT_FOLDER_ID } from "../../data/constants";
import { useAction, useDispatch, useSelector } from "../../store";
import Tab from "./Tabs/Tab";

export default (function Tabs() {
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.items.folders);
  const currentFolder = useSelector((state) => state.ui.currentFolder);
  const customFoldersExist = folders.length > 1;
  const { setCurrentFolder } = useAction();

  function onTabChange(event: CustomEvent<SegmentChangeEventDetail>) {
    dispatch(setCurrentFolder(event.detail.value ?? DEFAULT_FOLDER_ID));
  }

  useEffect(() => {
    setTimeout(() => {
      document.getElementById(currentFolder)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }, SCROLL_TIMEOUT);
  }, [currentFolder]);

  return customFoldersExist ? (
    <IonToolbar>
      <IonSegment scrollable value={currentFolder} onIonChange={onTabChange}>
        {folders.map(({ id, name: title }) => (
          <Tab key={id} id={id} value={title} />
        ))}
      </IonSegment>
    </IonToolbar>
  ) : null;
} as FC);

const SCROLL_TIMEOUT = 200;
