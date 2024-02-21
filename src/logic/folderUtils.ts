// @ts-nocheck

import { os, filesystem } from "@neutralinojs/lib"

import { LocateClasses } from './parser';
import { JavaTokenizer } from './lexers';

/**
 * Opens dialog for the user to select a directory for a java project, and then reads in the contents 
 * of each java file within
 */
export async function RetrieveJavaClassModelBySelectingProjectDirectory(): ClassModel[] {
  let projectDir: string = await os.showFolderDialog('Open a project Directory', {});
  let code = await GetRecursiveContentsOfDirectoryByExtension(projectDir, "java");
  const tokenizer = new JavaTokenizer(code);
  let tokens = [];
  let token = tokenizer.getNextToken();
  while (token !== null) {
      tokens.push(token);
      token = tokenizer.getNextToken();
  }
  let classes = LocateClasses(tokens);
  return classes;
}

/**
 * Returns the contents of all files within a directory that have the specified extension as a string
 * @param {string} dir - The directory to look through
 * @param {string} extension - The extension to look for
 * 
 * @returns {Promise<string>} - A string of the contents of each file concatenated together
 */
export async function GetRecursiveContentsOfDirectoryByExtension(dir: string, extension: string): Promise<string> {
  let items: string[][] = await GetItemsInDirectoryRecursive(dir, extension);
  let fileStr: string = await ReadFilesToString(items[0]);
  return fileStr;
}

/**
 * Returns a 2 element array. The first element is an array of paths (as strings) to each file in a directory, 
 * and the second is an array of paths (also as strings) to each sub-directory in the directory
 *
 * @param {string} dir - The directory to look through
 * @param {string} extension - (optional) Retrieve only files with the specified extension
 * 
 * @returns {Promise<string[][]>} - 2 element array, with the first element being an array of file paths and 
 * the second being an array of directory paths
 */
export async function GetItemsInDirectory(dir: string, extension: string = ""): Promise<string[][]> {
  let readDir = await filesystem.readDirectory(dir);
  let fileArr: string[] = [];
  let dirArr: string[] = [];
  for (const item of readDir)
  {
    if (item.type === "FILE" && (extension === "" || GetExtension(item.entry) === extension)) {
      fileArr.push(dir + "/" + item.entry);
    }
    else if (item.type === "DIRECTORY" && item.entry !== "." && item.entry !== "..") {
      dirArr.push(dir + "/" + item.entry);
    }
  }
  return [fileArr, dirArr];
}

/**
 * Returns a 2D array all items in this directory and in all subdirectories within it recursively. Index
 * 0 contains an array of file paths found while index 1 contains an array of directory paths found. I
 * hate recursion.
 *
 * @param {string} dir - The directory to look through
 * @param {string} extension - (optional) Only search for files of this extension
 * 
 * @returns {Promise<string[][]>} - All items found
 */
async function GetItemsInDirectoryRecursive (dir: string, extension: string = ""): Promise<string[][]> {
  let itemsInSubdir: string[][] = [[],[]];
  let itemsInDir: string[][] = await GetItemsInDirectory(dir, extension);

  if (itemsInDir[1].length === 0) {
    for (const i of itemsInDir[0]) {
      itemsInSubdir[0].push(i);
    }
    return itemsInSubdir;
  }

  for (const item of itemsInDir[1]) {
    let subdir: string[][] = await GetItemsInDirectoryRecursive(item, extension);
    for (const i of subdir[0]) {
      itemsInSubdir[0].push(i);
    }
    for (const i of subdir[1]) {
      itemsInSubdir[1].push(i);
    }
  }

  for (const i of itemsInSubdir[0]) {
    itemsInDir[0].push(i);
  }
  for (const i of itemsInSubdir[1]) {
    itemsInDir[1].push(i);
  }

  return itemsInDir;
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