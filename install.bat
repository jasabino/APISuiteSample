set mypath=%cd%
cd "C:\Program Files\MongoDB\Server\3.4\bin\"
mongorestore --db LibrarySampleDB "%mypath%\db"