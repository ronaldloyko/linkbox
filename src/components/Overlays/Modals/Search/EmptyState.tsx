import type { FC } from "react";
import { useTranslation } from "react-i18next";

export default (function EmptyState() {
  const { t } = useTranslation();

  return (
    <div
      style={{
        textAlign: "center",
        position: "absolute",
        left: 0,
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <h2
        style={{
          fontSize: "16px",
          lineHeight: "22px",
          color: "var(--ion-color-medium)",
          marginTop: "1rem",
        }}
      >
        {t("overlays.modals.search.heading")}
      </h2>
    </div>
  );
} as FC);
