import {
    BlobReader,
    BlobWriter,
    TextReader,
    TextWriter,
    ZipReader,
    ZipWriter,
  } from "@zip.js/zip.js";
  
export async function unzip(zipFileBlob) {

  console.log("GOT HERE")
  // Creates a BlobReader object used to read `zipFileBlob`.
  const zipFileReader = new BlobReader(zipFileBlob);
  // Creates a TextWriter object where the content of the first entry in the zip
  // will be written.
  const helloWorldWriter = new TextWriter();
  
  // Creates a ZipReader object reading the zip content via `zipFileReader`,
  // retrieves metadata (name, dates, etc.) of the first entry, retrieves its
  // content via `helloWorldWriter`, and closes the reader.
  const zipReader = new ZipReader(zipFileReader);
  const firstEntry = (await zipReader.getEntries()).shift();
  const helloWorldText = await firstEntry.getData(helloWorldWriter);
  await zipReader.close();
  
  // Displays "Hello world!".
  console.log(helloWorldText);
}  
