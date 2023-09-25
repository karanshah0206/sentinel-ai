# MySQL DATABASE SETUP

```
CREATE DATABASE sentinel_ai;

CREATE TABLE sentinel_ai.history (ID INT AUTO_INCREMENT PRIMARY KEY, Timestamp DATETIME, Verdict VARCHAR(255) NULL, Confidence DOUBLE NULL, Image LONGBLOB);
```

# BACKEND SETUP

Modify the following variables in the `Backend/sentinel.ai.api/appsettings.json` file:
```
Host: {db_server_address},
Port: {db_port},
Database: {db_name},
User: {db_user_name},
HistoryTable: {history_table_name}
```

Create `.env` file in the `Backend/sentinel.ai.api` directory.
Place the following inside the `.env` file:
```
DATABASE__PASSWORD={YourDBPwdHere}
```
