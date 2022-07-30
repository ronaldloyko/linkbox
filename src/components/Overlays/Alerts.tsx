import type { FC } from "react";
import DeleteFolderConfirmation from "./Alerts/DeleteFolderConfirmation";
import DeleteLinkConfirmation from "./Alerts/DeleteLinkConfirmation";

export default (function Alerts() {
  return (
    <>
      <DeleteFolderConfirmation />
      <DeleteLinkConfirmation />
    </>
  );
} as FC);
