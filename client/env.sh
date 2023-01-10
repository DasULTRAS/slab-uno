#!/bin/sh

# Recreate config file
rm -rf "$ENV_JS_PATH"
touch "$ENV_JS_PATH"

# line endings must be \n, not \r\n !
echo "window.__ENV__ = {" > "$ENV_JS_PATH"
# shellcheck disable=SC2086
awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' $DOT_ENV_PATH >> "$ENV_JS_PATH"
echo "}" >> "$ENV_JS_PATH"

echo "env.sh finished."
exit 0
