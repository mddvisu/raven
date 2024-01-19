import { os } from "@neutralinojs/lib"

export function SelectFolderPath() {
  let projectDir = os.showFolderDialog('Open a project directory', {});
  return projectDir;
}

// In progress
export function ReadJavaFilesInPath(path) {
    console.log(SelectFolderPath(path));
}