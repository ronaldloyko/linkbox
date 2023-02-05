import type { FC } from "react";
import SaveLink from "./Modals/SaveLink";
import SaveFolder from "./Modals/SaveFolder";
import Search from "./Modals/Search";
import Settings from "./Modals/Settings";
import Introduction from "./Modals/Introduction";
import Tags from "./Modals/Tags";

export default (function Modals() {
  return (
    <>
      <SaveFolder />
      <SaveLink />
      <Search />
      <Tags />
      <Settings />
      <Introduction />
    </>
  );
} as FC);
