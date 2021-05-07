const fs = require('fs');
const childProcess = require('child_process');


if (fs.existsSync("./src/index-module.ts")) fs.unlinkSync("./src/index-module.ts");
fs.copyFileSync("./src/index.ts", "./src/index-module.ts");
fs.appendFileSync("./src/index-module.ts", "\nexport default GeometryJS;");
childProcess.execSync("tsc");