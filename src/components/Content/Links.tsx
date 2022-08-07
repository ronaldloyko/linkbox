import { IonContent, IonList } from "@ionic/react";
import { useEffect, useMemo, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { useAction, useDispatch, useSelector } from "../../store";
import { LinkSorting } from "../../store/ui";
import EmptyState from "./Links/EmptyState";
import Link from "./Links/Link";

export default (function Links() {
  const dispatch = useDispatch();
  const links = useSelector((state) => state.items.links);
  const folders = useSelector((state) => state.items.folders);
  const currentFolder = useSelector((state) => state.ui.currentFolder);
  const linkSorting = useSelector((state) => state.ui.linkSorting);
  const { i18n } = useTranslation();
  const { setCurrentFolder } = useAction();
  const [swiper, setSwiper] = useState<SwiperClass>();

  const languageDirection = i18n.dir();

  const groupedLinks = useMemo(
    () =>
      folders.map((folder) => ({
        ...folder,
        links: (() => {
          const processedLinks = links.filter(
            (link) => link.folder === folder.id
          );

          switch (linkSorting) {
            case LinkSorting.Default:
              return processedLinks;
            case LinkSorting.Reversed:
              return [...processedLinks.reverse()];
            case LinkSorting.Alphabetically:
              return [
                ...processedLinks.sort(
                  ({ name: previousName }, { name: nextName }) =>
                    previousName.localeCompare(nextName)
                ),
              ];
            default:
              return processedLinks;
          }
        })(),
      })),
    [folders, links, linkSorting]
  );

  function onSwiperInitialization(swiper: SwiperClass) {
    setSwiper(swiper);
  }

  function onSwipe(event: SwiperClass) {
    dispatch(setCurrentFolder(folders[event.activeIndex].id));
  }

  useEffect(() => {
    swiper?.slideTo(folders.findIndex(({ id }) => id === currentFolder));
  }, [currentFolder, swiper, folders]);

  useEffect(() => {
    if (!swiper) {
      return;
    }

    swiper.rtlTranslate = languageDirection === "rtl";
    swiper.update();
  }, [swiper, languageDirection]);

  return (
    <Swiper
      style={{ height: "100%" }}
      onSwiper={onSwiperInitialization}
      onSlideChangeTransitionStart={onSwipe}
    >
      {groupedLinks.map(({ id, links }) => (
        <SwiperSlide key={id}>
          {!!links.length ? (
            <IonContent slot="content">
              <IonList lines="none">
                {links.map(({ id, name, url }) => (
                  <Link key={id} id={id} name={name} url={url} />
                ))}
              </IonList>
            </IonContent>
          ) : (
            <EmptyState />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
} as FC);

type SwiperClass = ReturnType<typeof useSwiper>;
