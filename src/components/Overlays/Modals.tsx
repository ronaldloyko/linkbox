import type { FC } from "react";
import SaveLink from "./Modals/SaveLink";
import SaveFolder from "./Modals/SaveFolder";
import Search from "./Modals/Search";
import Settings from "./Modals/Settings";
import Introduction from "./Modals/Introduction";
import Tags from "./Modals/Tags";
import SaveTag from "./Modals/SaveTag";

export default (function Modals() {
  return (
    <>
      <SaveFolder />
      <SaveLink />
      <SaveTag />
      <Search />
      <Tags />
      <Settings />
      <Introduction />
    </>
  );
} as FC);
