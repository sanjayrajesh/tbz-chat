#! /bin/bash

cd /var/opt
javac ConfigureEnv.java
java ConfigureEnv /var/opt/.env /usr/share/nginx/html/env-config.js