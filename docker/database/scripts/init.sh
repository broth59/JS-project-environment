set -e

sqlplus sys/oracle as sysdba @/$SQL_DIRECTORY/config_user.sql
sqlplus TESTER/1234 @/$SQL_DIRECTORY/create_sequence.sql
sqlplus TESTER/1234 @/$SQL_DIRECTORY/create_table.sql
sqlplus TESTER/1234 @/$SQL_DIRECTORY/create_trigger.sql
sqlplus TESTER/1234 @/$SQL_DIRECTORY/insert_data.sql