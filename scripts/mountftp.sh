# check if password exists, otherwise prompt the user
if [ -z ${JSPKAY_FTP_PASSWORD+x} ]; then
  echo -n "Enter password:"
  read JSPKAY_FTP_PASSWORD
fi

# mount the ftp directory
curlftpfs jspkay:$JSPKAY_FTP_PASSWORD@ftp.jspkay.altervista.org ftp
