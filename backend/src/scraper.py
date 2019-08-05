from bs4 import BeautifulSoup
import re

sources = {
    'ABC News': lambda res: {
        'meta': res.find('div', class_=re.compile('article-meta')).get_text(),
        'content': [text.get_text() for text in res.find_all('p', itemprop='articleBody')]
    },
    'Al Jazeera English': lambda res: {
        'meta': res.find('div', class_=re.compile('article-heading-author-wrap')).get_text(),
        'content': [text.get_text() for text in res.find_all('p', class_=re.compile('speakable'))]
    },
    'Ars Technica': lambda res: {
        'meta': res.find('section', class_=re.compile('post-meta')).get_text(),
        'content': [text.get_text() for text in res.find('div', itemprop="articleBody").find_all('p')]
    },
    'Associated Press': lambda res: {
        'meta': res.find('span', class_=re.compile('byline')).get_text(),
        'content': [text.get_text() for text in res.find('div', class_=re.compile('Article')).find_all('p')]
    },
    'Bleacher Report': lambda res: {
        'meta': res.find('span', class_="authorInfo").find('span', class_="name").get_text(),
        'content': [text.get_text() for text in res.find('div', class_='organism contentStream').find_all('p')]
    },
    'CNBC': lambda res: {
        'meta': res.find('div', class_='ArticleHeader-authorContainer').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='ArticleBody-articleBody').find_all('p')]
    },
    'CNN': lambda res: {
        'meta': res.find('div', class_='metadata__info').get_text(),
        'content': [text.get_text() for text in res.find_all('div', class_='zn-body__paragraph')]
    },
    'Engadget': lambda res: {
        'content': [text.get_text() for text in res.find('div', class_='grid@tl+').find_all('p')]
    },
    'Entertainment Weekly': lambda res: {
        'meta': res.find('div', class_='author-text').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='article-content').find_all('p')]
    },
    'Eonline.com': lambda res: {
        'meta': res.find('p', class_='entry-meta').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='post-content').find_all('p')]
    },
    'Fortune': lambda res: {
        'meta': res.find('div', class_='centerAligned__meta').get_text(),
        'content': [text.get_text() for text in res.find('main', id='content').find('article').find_all('p')]
    },
    'Fox News': lambda res: {
        'meta': res.find('div', class_='author-byline').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='article-body').find_all('p')]
    },
    'IGN': lambda res: {
        'meta': res.find('div', class_='article-byline').get_text(),
        'content': [text.get_text() for text in res.find('section', class_='article-page').find_all('p')]
    },
    'Latimes.com': lambda res: {
        'meta': res.find('div', class_='ArticlePage-byline').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='ArticlePage-articleBody').find_all('p')]
    },
    'Mashable': lambda res: {
        'meta': res.find('span', class_='author_name').get_text(),
        'content': [text.get_text() for text in res.find('section', class_='article-content blueprint').find_all('p')]
    },
    'Medical News Today': lambda res: {
        'meta': res.find('span', class_='author_byline').get_text(),
        'content': [text.get_text() for text in res.find('div', itemprop='articleBody').find_all('p')]
    },
    'MSNBC': lambda res: {
        'meta': res.find('section', class_='mb7').get_text(),
        'content': [text.get_text() for text in res.find_all('p', class_='endmarkEnabled')]
    },
    'MTV News': lambda res: {
        'meta': res.find('a', class_='author').get_text(),
        'content': [text.get_text() for text in res.find('section', class_='entry-content').find_all('p')]
    },
    'National Geographic': lambda res: {
        'meta': res.find('span', class_='byline-component__contributors').get_text(),
        'content': [text.get_text() for text in res.find_all('div', class_='parbase smartbody section has-p text')]
    },
    'National Review': lambda res: {
        'meta': res.find('div', class_='article-header__meta-byline').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='article-content').find_all('p')]
    },
    'NBC News': lambda res: {
        'meta': res.find('section', class_='mb7').get_text(),
        'content': [text.get_text() for text in res.find_all('p', class_='endmarkEnabled')]
    },
    'New Scientist': lambda res: {
        'meta': res.find('span', class_='author').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='article-content').find_all('p')]
    },
    'Newsweek': lambda res: {
        'meta': res.find('div', class_='byline').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='article-body').find_all('p')]
    },
    'New York Magazine': lambda res: {
        'meta': res.find('span', class_='primary-bylines').get_text(),
        'content': [text.get_text() for text in res.find_all('p', class_='clay-paragraph')]
    },
    'Next Big Future': lambda res: {
        'meta': res.find('div', class_='post-info').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='thecontent').find_all('p')]
    },
    'Polygon': lambda res: {
        'meta': res.find('div', class_='c-byline').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='c-entry-content').find_all('p')]
    },
    'Recode': lambda res: {
        'meta': res.find('div', class_='c-byline').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='c-entry-content').find_all('p')]
    },
    'Reuters': lambda res: {
        'meta': res.find('div', class_='BylineBar_byline').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='StandardArticleBody_body').find_all('p')]
    },
    'TechCrunch': lambda res: {
        'meta': res.find('div', class_='article__byline').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='article-content').find_all('p')]
    },
    'TechRadar': lambda res: {
        'meta': res.find('span', class_='by-author').find('span').get_text(),
        'content': [text.get_text() for text in res.find('div', id='article-body').find_all('p')]
    },
    'The American Conservative': lambda res: {
        'meta': res.find('div', class_='byline').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='post-content').find_all('p')]
    },
    'The Hill': lambda res: {
        'meta': res.find('span', class_='submitted-by').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='field-item even').find_all('p')]
    },
    'The Huffington Post': lambda res: {
        'meta': res.find('div', class_='author-card__details').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='entry__content').find_all('p')]
    },
    'The New York Times': lambda res: {
        'meta': res.find('p', itemprop='author').get_text(),
        'content': [text.get_text() for text in res.find('section', name='articleBody').find_all('p')]
    },
    'The Next Web': lambda res: {
        'meta': res.find('div', class_='c-post-author').find('a').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='c-formatted c-post-content').find_all('p')]
    },
    'The Verge': lambda res: {
        'meta': res.find('div', class_='c-byline').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='c-entry-content').find_all('p')]
    },
    'The Washington Post': lambda res: {
        'meta': res.find('div', class_='author-sig-line-wrapper').get_text(),
        'content': [text.get_text() for text in res.find('article', itemprop='articleBody').find_all('p')]
    },
    'The Washington Times': lambda res: {
        'meta': res.find('div', class_='meta').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='bigtext').find_all('p')]
    },
    'Time': lambda res: {
        'meta': res.find('div', class_='author-text').get_text(),
        'content': [text.get_text() for text in res.find('div', id='article-body').find_all('p')]
    },
    'USA Today': lambda res: {
        'meta': res.find('div', class_='asset-metabar').get_text(),
        'content': [text.get_text() for text in res.find_all('p', class_='p-text')]
    },
    'Vice News': lambda res: {
        'meta': res.find('div', class_='_omxk26').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='post-content_1dda3b7').find_all('p')]
    },
    'Washingtonexaminer.com': lambda res: {
        'meta': res.find('div', class_='ArticlePage-authorTexts').get_text(),
        'content': [text.get_text() for text in res.find('div', class_='ArticlePage-articleBody').find_all('p')]
    },
    'Wired': lambda res: {
        'meta': res.find('ul', class_='meta-list').get_text(),
        'content': [text.get_text() for text in res.find('article', class_=re.compile('article-body-component')).find_all('p')]
    },
    'Yahoo': lambda res: {
        'meta': res.find('div', class_='auth-prov-soc').get_text(),
        'content': [text.get_text() for text in res.find('article', itemprop='articleBody').find_all('p')]
    }
}


def scrape_data(response, source_name):
    soup = BeautifulSoup(response.text, 'html.parser')
    if source_name not in sources or not sources[source_name](soup):
        return False
    return sources[source_name](soup)

