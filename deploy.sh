#!/bin/sh
npm run build && rsync -avz --delete --exclude '.DS_Store' build/ elated@h:cutecast.elated.com/

