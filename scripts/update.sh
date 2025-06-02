# current path directory
#   we basically take the current scripts dir and append it to path temporarily
cpd=$(dirname "$(pwd)/${BASH_SOURCE[0]}")
PATH="$PATH:$cpd"

echo "building the website..."
# update the build
bundle exec jekyll build --verbose --incremental --trace

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
