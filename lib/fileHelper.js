import fs from "fs";
import path from "path";

function filePath(fileName) {
  return path.join(process.cwd(), "data", fileName);
}

export function readData(fileName) {
  const json = fs.readFileSync(filePath(fileName), "utf8");
  return JSON.parse(json);
}

export function writeData(data, fileName) {
  fs.writeFileSync(filePath(fileName), JSON.stringify(data, null, 2));
}
