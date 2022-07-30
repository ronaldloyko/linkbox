import type { FC } from "react";
import LinkActions from "./Sheets/LinkActions";
import FolderActions from "./Sheets/FolderActions";

export default (function Sheets() {
  return (
    <>
      <FolderActions />
      <LinkActions />
    </>
  );
} as FC);
