import type { IconType } from "react-icons";


export type ConfirmOptions = {
  confirmText?: string;
  cancelText?: string;
}

export type ConfirmOverlay = ConfirmOptions & {
  label: string;
  icon: IconType;
  danger?: boolean;
}

export type Overlay = {
  type: "confirm";
  opt: ConfirmOverlay
}

