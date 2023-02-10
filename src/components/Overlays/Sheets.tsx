import type { FC } from "react";
import LinkActions from "./Sheets/LinkActions";
import FolderActions from "./Sheets/FolderActions";
import TagActions from "./Sheets/TagActions";

export default (function Sheets() {
  return (
    <>
      <FolderActions />
      <LinkActions />
      <TagActions />
    </>
  );
} as FC);
