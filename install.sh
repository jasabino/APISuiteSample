mypath=$PWD
cd /var/lib/mongodb
mongorestore -h localhost -d LibrarySampleDB "%mypath%\db"