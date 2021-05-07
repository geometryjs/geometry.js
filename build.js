const fs = require('fs');
const childProcess = require('child_process');


fs.unlinkSync("./src/index-module.ts");
fs.copyFileSync("./src/index.ts", "./src/index-module.ts");
fs.appendFileSync("\nexport default GeometryJS;", "./src/index-module.ts");
childProcess.execSync("tsc");