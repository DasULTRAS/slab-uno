#!/bin/sh

# Recreate config file
rm -rf ./env.js
touch ./env.js

# line endings must be \n, not \r\n !
echo "window.__ENV__ = {" > ./env.js
# shellcheck disable=SC2086
awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' .env >> ./env.js
echo "}" >> ./env.js

exit 0
