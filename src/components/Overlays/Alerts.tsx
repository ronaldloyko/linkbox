import type { FC } from "react";
import DeleteFolderConfirmation from "./Alerts/DeleteFolderConfirmation";
import DeleteLinkConfirmation from "./Alerts/DeleteLinkConfirmation";
import DeleteTagConfirmation from "./Alerts/DeleteTagConfirmation";

export default (function Alerts() {
  return (
    <>
      <DeleteFolderConfirmation />
      <DeleteLinkConfirmation />
      <DeleteTagConfirmation />
    </>
  );
} as FC);
