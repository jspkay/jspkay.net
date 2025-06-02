# update the build
bundle exec jekyll build --verbose --incremental --trace

./mountftp.sh

# update the website
rsync -ruP --info=progress2 --info=name0 _site ftp

umount ftp
