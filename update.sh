# update the build
jekyll build --incremental

# check if password exists, otherwise prompt the user
if [ -z ${JSPKAY_FTP_PASSWORD+x} ]; then
  echo "Enter password:"
  read JSPKAY_FTP_PASSWORD
fi

# mount the fpt directory
curlftpfs jspkay:$JSPKAY_FTP_PASSWORD@ftp.jspkay.altervista.org ftp

# update the website
rsync -ruP --info=progress2 --info=name0 _site ftp

umount ftp
