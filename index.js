import generate_mysql_dump from "./lib/mysql.js";
import upload_file_on_google_drive from "./lib/google.js";
import date from "date-and-time";

let now = new Date();
let date_string = date.format(now, "YYYY-MM-DD_HH-mm-ss");
const file_name = "db_backup_" + date_string + ".sql";

/**
 * This function will generate a dump of the database and save it to the filename provided
 * The other parameters are the credentials for the MySQL database
 * You can also use environment variables instead of hardcoding the credentials
 */

generate_mysql_dump("localhost", "root", "user", "pass", file_name);

/**
 * the first parameter is the name of the file
 * the second parameter is the ID of the folder on Google Drive where you want to upload the file
 * the third parameter is a boolean that indicates whether you want to delete the file after uploading it to Google Drive
 * If you don't want to delete the file, just remove the third parameter
 */

upload_file_on_google_drive(file_name, "folder_id", true);
