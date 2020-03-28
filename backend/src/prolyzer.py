import json
from datetime import datetime
import os
import tweepy as twp
import re
from ibm_watson import ToneAnalyzerV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
import mysql.connector
import urllib.parse


def prolyzer(event, context):
    print("")
    search_term = event["queryStringParameters"]['search']

    consumer_key = 'k7bmKlFjUf3eyFcwpqi1D34aZ'
    consumer_secret = 'l4u0IRz5AYt9HXThR5lWTN41dTX5UMrs3VmZnmNPZky1mJmf7M'
    access_token = '1263822842-QDqzja2ZGdE2RWlL12UxEnMCcGsDUxDkxsfdDZc'
    access_token_secret = 'gcRxVFfwpeQr8mGF4BLP9ScK2qJnxWZxnneoq0fQFDznq'

    auth = twp.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = twp.API(auth)

    authenticator = IAMAuthenticator('G7Um77PYTSWaI23-QJg-NqJrDrECeUnzn1_nSCbPkS-Q')
    tone_analyzer = ToneAnalyzerV3(
        version='2017-09-21',
        authenticator=authenticator
    )

    tone_analyzer.set_service_url(
        'https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/046af756-8b3b-4b48-be22-627b30bf6321')

    tone_analyzer.set_disable_ssl_verification(True)

    print("Connecting to database...")
    mydb = mysql.connector.connect(
        host=os.getenv('DB_ENDPOINT'),
        user="admin",
        passwd="password",
        database=os.getenv('TABLE_NAME', 'prolyzer')
    )
    print("Connected to database")

    mycursor = mydb.cursor()

    search_words = search_term

    total_tweets = ''
    # Collect tweets
    print("Collecting 100 tweets for search term " + search_term)
    tweets = twp.Cursor(api.search, q=search_words, lang="en").items(100)

    for tweet in tweets:
        total_tweets = total_tweets + ' '.join(
            re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t]) |(\w+:\/\/\S+)", " ", tweet.text).split())

    print(total_tweets)
    tone_analysis = tone_analyzer.tone(
        {'text': total_tweets},
        content_type='application/json'
    ).get_result()

    print("Inserting into database")
    sql = "INSERT INTO results (search_term,tweets,results) VALUES (%s, %s, %s)"
    val = (search_words, str(total_tweets), str(tone_analysis))
    mycursor.execute(sql, val)

    mydb.commit()
    mycursor.close()
    print("Closing connection to database")
    mydb.close()
    print("Connection to database closed")

    response = {
        "statusCode": 200,
        "body": json.dumps({
            "tone_response": tone_analysis
        }),
        "headers": {
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Credentials": True,
        }
    }

    return response


handler = prolyzer