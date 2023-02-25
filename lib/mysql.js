import mysqldump from "mysqldump";

// This function will generate a dump of the database and save it to the filename provided
// The other parameters are the credentials for the MySQL database
// You can also use environment variables instead of hardcoding the credentials
// The function returns a promise
// You can use the promise to know when the dump is finished
// You can also use the promise to handle errors
function generate_mysql_dump(host, user, password, database_name, filename) {
  mysqldump({
    connection: {
      host: host,
      user: user,
      password: password,
      database: database_name,
      //if using MAMPP please add
      //socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
    },
    dumpToFile: filename,
  });
}

export default generate_mysql_dump;
