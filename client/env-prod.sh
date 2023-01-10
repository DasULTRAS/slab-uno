#!/bin/sh

# Recreate config file
rm -rf /usr/share/nginx/html/env.js
touch /usr/share/nginx/html/env.js

# line endings must be \n, not \r\n !
echo "window.__ENV__ = {" > /usr/share/nginx/html/env.js
# shellcheck disable=SC2086
awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' /usr/share/nginx/html/.env >> /usr/share/nginx/html/env.js
echo "}" >> /usr/share/nginx/html/env.js

exit 0
