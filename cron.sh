#!/bin/bash

#####
# If using the cron in a Linux instance run before:
#
# > which node
# > sudo ln -s <output of which node> /usr/bin/node
# > npm install -g ts-node
# > which ts-node
# > sudo ln -s <output of which ts-node> /usr/bin/ts-node
#####

cd /home/ec2-user/duck-monitor
/home/ec2-user/.nvm/versions/node/v16.6.1/bin/npm run monitor