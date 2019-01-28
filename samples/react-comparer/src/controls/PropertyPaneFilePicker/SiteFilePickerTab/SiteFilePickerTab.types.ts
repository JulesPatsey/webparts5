import { IFilePickerTab } from "../IFilePickerTab.types";

export interface ISiteFilePickerTabProps extends IFilePickerTab {
}

export interface ISiteFilePickerTabState {
  fileUrl?: string;
  libraryAbsolutePath: string;
  libraryTitle: string;
  libraryPath: string;
  folderName: string;
}
