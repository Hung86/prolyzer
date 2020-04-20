import json
from datetime import datetime
import os
import re
import mysql.connector
import urllib.parse
import time

def dbhashtagscount(event, context):
    print("")
    searchTerm = event["queryStringParameters"]['search']

    print("Connecting to database...")
    mydb = mysql.connector.connect(
        host=os.environ.get("DB_ENDPOINT"),
        user="admin",
        passwd="password",
        database=os.environ.get("TABLE_NAME")
    )
    print("Connected to database")
    
    mycursor = mydb.cursor()
    query = "SELECT hashtags,COUNT(*) as count FROM tweets WHERE search_term=" + "'" + searchTerm + "'" + " AND hashtags <>" + " '" + "'" + " GROUP BY hashtags ORDER BY count DESC"
    mycursor.execute(query)
    row_headers=[x[0] for x in mycursor.description]
    rv = mycursor.fetchall()
    json_data=[]
    for result in rv:
       json_data.append(dict(zip(row_headers,result)))

    mycursor.close()
    print("Closing connection to database")
    mydb.close()
    print("Connection to database closed")

    response = {
        "statusCode": 200,
        "body": json.dumps({
            "db_response": json_data
        },default=str),
        "headers": {
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Credentials": True,
        }
    }

    return response


handler = dbhashtagscount
