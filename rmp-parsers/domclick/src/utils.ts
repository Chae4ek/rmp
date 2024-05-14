import fs from 'fs';

export class FileWriter {
  private fd: number;

  constructor(filePath: string, append: boolean) {
    this.fd = fs.openSync(filePath, append ? 'a' : 'w');
  }

  close() {
    fs.closeSync(this.fd);
  }

  writeToFile(data: string, postfix: string, debugInfo: any) {
    data += postfix;
    fs.writeFile(this.fd, data, (err) => {
      if (err) {
        console.log(`error: data has not been written! context: ${debugInfo}`);
      }
    });
  }

  writeToFileSync(data: string, postfix: string) {
    data += postfix;
    fs.writeFileSync(this.fd, data);
  }
}

export class FileReader {
  private fd: number;

  constructor(filePath: string) {
    this.fd = fs.openSync(filePath, 'r');
  }

  close() {
    fs.closeSync(this.fd);
  }

  readFromFile() {
    return fs.readFileSync(this.fd).toString();
  }
}
