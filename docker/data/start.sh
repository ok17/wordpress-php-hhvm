#! /bin/sh

/etc/init.d/nginx start
/etc/init.d/hhvm start

while true
do
  sleep 10
done
