const fs = require('fs');

fs.readFile(".env", (err, data) => {
    if(err) {
        console.error("Exception while reading '.env' file", err);
        return;
    }

    let env = {};

    String(data).replace(/\r/g, "").split("\n").map(line => line.split("=")).forEach(([key, value]) => {
        if(key) {
            env[key] = process.env[key] || value;
        }
    });

    console.log(env);

    fs.writeFile("public/env-config.js", "window._env_ = " + JSON.stringify(env, undefined, 4), e => {
        if(e) {
            console.error("Exception while writing 'public/env-config.js'", e);
        }
    });
})