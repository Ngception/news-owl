import os
import requests
from scraper import scrape_data
from flask import Flask, jsonify, request
from flask_cors import CORS
from newsapi import NewsApiClient
app = Flask(__name__)
CORS(app)
NEWS_API = os.environ.get('NEWS_API')
newsapi = NewsApiClient(api_key=NEWS_API)


@app.route('/')
def fetch_articles():
    top_headlines = newsapi.get_top_headlines(language='en', country='us')
    return top_headlines

@app.route('/categories/<string:category>')
def fetch_articles_by_category(category):
    articles_by_category = newsapi.get_top_headlines(category=category, language='en', country='us')
    return articles_by_category

@app.route('/sources')
def fetch_sources():
    list_of_sources = newsapi.get_sources(country='us')
    grouped_sources = {}
    for source in list_of_sources['sources']:
        if not source['category'] in grouped_sources:
            grouped_sources[source['category']] = []
        grouped_sources[source['category']].append(source)
    return jsonify(data=grouped_sources)

@app.route('/sources/<string:source>')
def fetch_articles_by_source(source):
    top_headlines = newsapi.get_top_headlines(sources=source, language='en')
    return top_headlines

@app.route('/articles/scrape', methods=['POST'])
def scrape_article_data():
    target = request.get_json()
    url = target['url']
    source_name = target['name']
    response = requests.get(url)
    article = scrape_data(response, source_name)
    return jsonify(data=article)
