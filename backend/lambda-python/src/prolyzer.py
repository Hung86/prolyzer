from ibm_watson import ToneAnalyzerV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
#import os
import tweepy as twp
#import json
#import preprocessor as p
#from preprocessor import clean, tokenize, parse

def prolyzer(event, context):
	authenticator = IAMAuthenticator('G7Um77PYTSWaI23-QJg-NqJrDrECeUnzn1_nSCbPkS-Q')
	tone_analyzer = ToneAnalyzerV3(
		version='2017-09-21',
		authenticator=authenticator
	)

	tone_analyzer.set_service_url('https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/046af756-8b3b-4b48-be22-627b30bf6321')

	tone_analyzer.set_disable_ssl_verification(True)

	consumer_key = 'k7bmKlFjUf3eyFcwpqi1D34aZ'
	consumer_secret = 'l4u0IRz5AYt9HXThR5lWTN41dTX5UMrs3VmZnmNPZky1mJmf7M'
	access_token = '1263822842-QDqzja2ZGdE2RWlL12UxEnMCcGsDUxDkxsfdDZc'
	access_token_secret = 'gcRxVFfwpeQr8mGF4BLP9ScK2qJnxWZxnneoq0fQFDznq'

	auth = twp.OAuthHandler(consumer_key, consumer_secret)
	auth.set_access_token(access_token, access_token_secret)
	api = twp.API(auth)

	#tweets = api.user_timeline()
	search_words = "covid-19"
	date_since = "2019-12-20"

	nTweet = ''
	# Collect tweets
	tweets = twp.Cursor(api.search,q=search_words,lang="en",since=date_since).items(10)
	for tweet in tweets:
		#print(tweet.text)
		#print('\n'+'\n')
		#nTweet = nTweet + tweet.text + '\n' 
		clean_text = p.clean(tweet.text)
		nTweet = nTweet + clean_text + '\n'
	#print(nTweet)
	text = 'Team, I know that times are tough! Product '\
		'sales have been disappointing for the past three '\
		'quarters. We have a competitive product, but we '\
		'need to do a better job of selling it!'
	return nTweet

handler = prolyzer
'''tone_analysis = tone_analyzer.tone(
{'text': nTweet},
content_type='application/json'
).get_result()

print(json.dumps(tone_analysis))'''

