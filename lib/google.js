import { google } from "googleapis";
import { createReadStream, unlink } from "fs";
// The key.json file contains the credentials for the service account
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const key = require("../key.json");

const drive = google.drive("v3");

/**
 * the first parameter is the email address of the service account
 * the second parameter is the private key of the service account
 * the third parameter is an array of scopes
 * the fourth parameter is the subject of the service account
 * the fifth parameter is the private key id of the service account
 */
const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ["https://www.googleapis.com/auth/drive"],
  null
);

/**
 *
 * @param {*} filename
 * @param {*} parent_folder_id
 * @param {*} delete_after_upload
 * @returns
 * This function will upload a file to Google Drive
 * The first parameter is the name of the file
 * The second parameter is the ID of the folder on Google Drive where you want to upload the file
 * The third parameter is a boolean that indicates whether you want to delete the file after uploading it to Google Drive
 * If you don't want to delete the file, just remove the third parameter
 * The function returns a promise
 * You can use the promise to know when the file is uploaded
 * You can also use the promise to handle errors
 * The function will return the ID of the file on Google Drive
 * You can use this ID to share the file with other users
 * You can also use this ID to delete the file
 * You can use the Google Drive API to do this
 */

function upload_file_on_google_drive(
  filename,
  parent_folder_id,
  delete_after_upload = false
) {
  jwtClient.authorize((authErr) => {
    if (authErr) {
      console.log(authErr);
      return;
    } else {
      const fileMetadata = {
        name: filename,
        parents: [parent_folder_id],
      };
      const media = {
        mimeType: "text/plain",
        body: createReadStream(filename),
      };
      drive.files.create(
        {
          auth: jwtClient,
          resource: fileMetadata,
          media,
          fields: "id",
        },
        (err, file) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("File created with ID: ", file.data.id);
          if (delete_after_upload) {
            unlink(filename, (err) => {
              if (err) {
                console.log(
                  "An error occurred while deleting th DB file: " + err
                );
              }
            });
          }
        }
      );
    }
  });
}

export default upload_file_on_google_drive;
