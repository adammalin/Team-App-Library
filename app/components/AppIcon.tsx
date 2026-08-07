import Image from "next/image";
import { MapTrifold } from "@phosphor-icons/react/dist/ssr";
import type { AppEntry } from "../app-data";

export function AppIcon({
  app,
  size = "large",
}: {
  app: AppEntry;
  size?: "small" | "large";
}) {
  if (app.iconKind === "map") {
    return (
      <span
        className={"app-icon app-icon--map app-icon--" + size}
        aria-hidden="true"
      >
        <MapTrifold weight="regular" />
      </span>
    );
  }

  return (
    <span className={"app-icon app-icon--" + size}>
      <Image
        src={app.icon ?? ""}
        alt=""
        width={size === "large" ? 104 : 44}
        height={size === "large" ? 104 : 44}
        unoptimized
      />
    </span>
  );
}
