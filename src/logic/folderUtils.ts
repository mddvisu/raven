import { os, filesystem } from "@neutralinojs/lib"

/**
 * Opens dialog for the user to select a directory for a java project, and then reads in the contents 
 * of each java file within
 * 
 * TODO: Search through sub-directories for java files as well. As of now this will only catch java files 
 * directy within the directory
 */
export async function SelectJavaProjectDirectory() {
  let projectDir: string = await os.showFolderDialog('Open a project Directory', {});

  //let rootDirectoryItems: string[][] = await GetItemsInDirectory(projectDir);
  let subdirectories = FindSubDirs([projectDir]);




  //let projectCode: string = await GetContentsOfDirectoryByExtension(projectDir, "java");
  //console.log(projectCode);
  //let fgfgf = await filesystem.readFile("C:/Users/matt7/OneDrive/Desktop/Davis.java");
  console.log(subdirectories);
}

// I hate recursion
// return all java paths
async function FindSubDirs (folders: string[]): Promise<string[]> {
  let subdirs: string[] = [];
  for (const item of folders) {
    let itemsInSubdir: string[][] = await GetItemsInDirectory(item);
    let subdirInSubdir: string[] = await FindSubDirs(itemsInSubdir[1]);
    for (const sub of subdirInSubdir) {
      subdirs.push(sub);
    }
  }
  return subdirs;
}

/**
 * Returns the contents of all files within a directory that have the specified extension as a string
 * 
 * @param {string} dir - The directory to look through
 * @param {string} extension - The extension to look for
 * 
 * @returns {Promise<string>} - A string of the contents of each file concatenated together
 */
export async function GetContentsOfDirectoryByExtension(dir: string, extension: string): Promise<string> {
  let items: string[][] = await GetItemsInDirectory(dir);
  let javaFiles: string[] = GetFilesOfExtension(items[0], extension);
  let fileStr: string = await ReadFilesToString(javaFiles);
  return fileStr;
}

/**
 * Returns a 2 element array. The first element is an array of paths (as strings) to each file in a directory, 
 * and the second is an array of paths (also as strings) to each sub-directory in the directory
 * 
 * @param {string} dir - The directory to look through
 * 
 * @returns {Promise<string[][]>} - 2 element array, with the first element being an array of file paths and 
 * the second being an array of directory paths
 */
export async function GetItemsInDirectory(dir: string): Promise<string[][]> {
  let readDir = await filesystem.readDirectory(dir);
  let fileArr: string[] = [];
  let dirArr: string[] = [];
  for (const item of readDir)
  {
    if (item.type === "FILE") {
      fileArr.push(dir + "/" + item.entry);
    }
    else if (item.type === "DIRECTORY") {
      dirArr.push(dir + "/" + item.entry);
    }
  }
  console.log(fileArr);
  return [fileArr, dirArr];
}

/**
 * Takes in a list of strings of file paths and returns the contents of all files as a string
 * 
 * @param {string[]} files - An array of the file paths
 * 
 * @returns {Promise<string>} - The content of the file as a string
 */
export async function ReadFilesToString(files: string[]): Promise<string> {
  let fileStr: string = "";
  for (const file of files) {
    fileStr += await filesystem.readFile(file, {pos:0, size: 100000}) + "\n";
    console.log(fileStr);
  }
  return fileStr;
}

/**
 * Takes in a file name as a string and returns its extension
 * 
 * @param {string} filename - The file name or path including the extension
 * @returns {string | undefined} - The extension (without the .) if the filename had one, undefined if not
 */
export function GetExtension(filename: string): string | undefined {
  return filename.split('.').pop();
}

/**
 * Takes in a list of strings of file paths. Returns an array of only the strings with the extension specified
 * in the second parameter
 * 
 * @param {string[]} filename - The file paths to look through
 * @param {string} extension - The extension to look for
 * 
 * @returns {string[]} - An array of file paths containing the specified extension
 */
export function GetFilesOfExtension(files: string[], extension: string): string[] {
  let retFiles: string[] = [];
  for (const file of files) {
    let fileExtension = GetExtension(file);
    if (fileExtension === extension) {
      retFiles.push(file)
    }
  }
  console.log(retFiles);
  return retFiles;
}