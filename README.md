Create backup: `docker exec real-estate-agency-db-1 sh -c 'exec mysqldump -uadmin -pbigsnorlax flats' > ./flats-dump.sql`
Restore backup: `docker exec -i real-estate-agency-db-1 sh -c 'exec mysql -uadmin -pbigsnorlax flats' < ./flats-dump.sql`

TODO:
- GA?
- remove properties without pics
- forms validation client form
- color variables

- (R) where: {'$type.id$': 'rent'} doesn't work
- (R) replace croissant
- fix any and ts-ignore
- not use volumes on prod
- handle issue with ugly undefined
