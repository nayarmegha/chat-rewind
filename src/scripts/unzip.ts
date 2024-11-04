import {
    BlobReader,
    TextWriter,
    ZipReader,
  } from "@zip.js/zip.js";
  
export async function unzip(zipFileBlob : Blob) {

  const targetFileExtension = "txt"
  // Creates a BlobReader object used to read `zipFileBlob`.
  const zipFileReader = new BlobReader(zipFileBlob);
  // Creates a TextWriter object where the content of the first entry in the zip
  // will be written.
  const textWriter = new TextWriter();
  
  // Creates a ZipReader object reading the zip content via `zipFileReader`,
  // retrieves metadata (name, dates, etc.) of the first entry, retrieves its
  // content via `helloWorldWriter`, and closes the reader.
  const zipReader = new ZipReader(zipFileReader);
  const allEntries = (await zipReader.getEntries());
  console.log(allEntries)
  const chatFile = allEntries.find((data) => data.filename.split('.').pop() == targetFileExtension)
  console.log(chatFile)


  const chatData = await chatFile.getData(textWriter);
  await zipReader.close();
  const chatblob = new Blob([chatData], {
    type: 'text/plain'
  });
 
  return chatblob
}  
