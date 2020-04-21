# prolyzer

[![CircleCI](https://circleci.com/gh/ZY-Ang/prolyzer.svg?style=svg&circle-token=4025649c07aafd12471461678360d6b51d216d85)](https://circleci.com/gh/ZY-Ang/prolyzer)

This is a monorepo so projects are organized front/back end. You can install dependencies for one subproject without installing for all.

It consists of the frontend code developed using ReactJS a javascript library for building user interfaces.

And the backend code developed using Python to crawl tweets, preprocess them and send to IBM Watson Tone Analyzer for sentiment analysis. It also consists of the necessary database operations for storing and retrieval of tweets and the results for frontend to display.

The relevant backend scripts and their functionalities located at prolyzer/backend are as below:

setup.sql - Creation of the necessary tables in Prolyzer Database for storage of data (raw tweets and processed data) and results.

dbhashtags.py - Handler used to retrieve all hashtags associated with the search term from tweets database.

dbhashtagscount.py - Handler used to retrieve all hashtags and the count associated with the search term from the tweets database.

dbuser.py - Handler used to retrieves all previous search results of a user from the results database.

dbusersearch.py - Handler used to retrieve the past 10 days results of a user for a search term from the results database.

prolyzer.py - Main handler used for crawling, preprocessiong of tweets and subsequent analysis of dataset at IBM Watsons Tone Analyzer and insertion of data and results to the tweets, results and resultsdump databases.
