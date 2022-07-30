import type { FC } from "react";
import Alerts from "./Overlays/Alerts";
import Modals from "./Overlays/Modals";
import Sheets from "./Overlays/Sheets";

export default (function Overlays() {
  return (
    <>
      <Alerts />
      <Modals />
      <Sheets />
    </>
  );
} as FC);
