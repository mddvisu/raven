import {GetExtension} from "../logic/folderUtils";

test("Unit Test GetExtension", () => {
  let filename = "mycoolfile.exe";
  let filenameExtension = GetExtension(filename);
  expect(filenameExtension).toBe("exe");
});
