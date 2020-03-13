import json
from datetime import datetime
import os
import tweepy as twp
import json
import re
#import preprocessor as p
def clean_tweet(tweet):
    '''Utility function to clean tweet text by removing links, special characters using simple regex statements.''' 
    return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t]) |(\w+:\/\/\S+)", " ", tweet).split())

def prolyzer(event, context):
	consumer_key = 'k7bmKlFjUf3eyFcwpqi1D34aZ'
	consumer_secret = 'l4u0IRz5AYt9HXThR5lWTN41dTX5UMrs3VmZnmNPZky1mJmf7M'
	access_token = '1263822842-QDqzja2ZGdE2RWlL12UxEnMCcGsDUxDkxsfdDZc'
	access_token_secret = 'gcRxVFfwpeQr8mGF4BLP9ScK2qJnxWZxnneoq0fQFDznq'

	auth = twp.OAuthHandler(consumer_key, consumer_secret)
	auth.set_access_token(access_token, access_token_secret)
	api = twp.API(auth)

	#tweets = api.user_timeline()
	search_words = "#covid-19"
	date_since = "2019-12-20"

	totalTweets = ''
	# Collect tweets
	tweets = twp.Cursor(api.search,q=search_words,lang="en",since=date_since).items(10)
	#p.set_options(p.OPT.URL,p.OPT.MENTION,p.OPT.HASHTAG,p.OPT.RESERVED,p.OPT.NUMBER)
	for tweet in tweets:
		#totalTweets = totalTweets + p.clean(tweet.text)+ '\n'
		totalTweets = totalTweets + clean_text(tweet.text) + '\n'

	print(totalTweets)

	response = {
		"statusCode": 200,
		"body": json.dumps({
			"tweets": totalTweets
		})
	}

	return response


handler = prolyzer