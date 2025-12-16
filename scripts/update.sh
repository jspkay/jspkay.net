#!/bin/bash

# current path directory
#   we basically take the current scripts dir and append it to path temporarily
cpd=$(dirname "$(pwd)/${BASH_SOURCE[0]}")
PATH="$PATH:$cpd"

if [ $# == 2 -a $1 != "skip-build" ]; then
  echo "building the website..."
  build.sh
fi

echo "mounting ftp resource..."
# This is now in $cpd
mountftp.sh

echo "transfering files..."
# update the website
# rsync -ruP --info=progress2 --info=name0 _site ftp
cp -ru _site/* ftp/ &
progress -mp $!

echo "unmounting ftp resource..."
umount ftp

echo "Done!"
