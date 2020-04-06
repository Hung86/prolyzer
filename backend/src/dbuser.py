import json
from datetime import datetime
import os
import re
import mysql.connector
import urllib.parse
import time

def dbuser(event, context):
    print("")
    user = event["queryStringParameters"]['user']

    print("Connecting to database...")
    mydb = mysql.connector.connect(
        host="prolyzer-backend-production.cr28byc2iyut.ap-southeast-1.rds.amazonaws.com",
        user="admin",
        passwd="password",
        database="prolyzer"
    )
    print("Connected to database")
    
    mycursor = mydb.cursor()
    query = "SELECT * FROM results WHERE user=" + "'" + user + "'"
    mycursor.execute(query)
    row_headers=[x[0] for x in mycursor.description] #this will extract row headers
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
            "tone_response": json_data
        }),
        "headers": {
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Credentials": True,
        }
    }

    return response


handler = dbuser