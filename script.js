const fs = require("fs");
const path = require("path");

// I keep this file in a scripts folder
const packagelock = path.resolve(__dirname, "../package-lock.json");

fs.readFile(packagelock, "utf8", (err, data) => {
  if (err) {
    return console.log(err);
  }

  const token = process.env.PAT;
  console.log(token);

  const result = data.replace(
    /\"resolved\"\:\s\"git\+ssh:\/\/git\@github\.com\/sudarsana-reddy\/npm-proj\.git/g,
    '"resolved": `git+https://${token}@github.com/sudarsana-reddy/npm-proj.git`'
  );

  fs.writeFile(packagelock, result, "utf8", (err) => {
    if (err) {
      return console.log(err);
    } else {
      return console.log("Package lock was fixed");
    }
  });
});