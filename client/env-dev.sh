#!/bin/sh

# Recreate config file
rm -rf /app/public/env.js
touch /app/public/env.js

# line endings must be \n, not \r\n !
echo "window.__ENV__ = {" > /app/public/env.js
# shellcheck disable=SC2086
awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' /app/.env >> /app/public/env.js
echo "}" >> /app/public/env.js

exit 0
