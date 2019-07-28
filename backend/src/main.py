from flask import Flask, jsonify, request
from flask_cors import CORS
from newsapi import NewsApiClient
app = Flask(__name__)
CORS(app)
newsapi = NewsApiClient(api_key=NEWS_API)


@app.route('/')
def fetch_articles():
    top_headlines = newsapi.get_top_headlines(language='en', country='us')
    return top_headlines

@app.route('/<string:type>')
def fetch_articles_type(type):
    articles_by_type = newsapi.get_top_headlines(category=type, language='en', country='us')
    return articles_by_type