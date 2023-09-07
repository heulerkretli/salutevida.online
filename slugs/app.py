from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/extract-slugs', methods=['GET'])
def extract_slugs():
    url = request.args.get('url')
    
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    slugs = []
    
    for link in soup.find_all('a'):
        slug = link.get('href')
        if slug:
            slugs.append(slug)
    
    return jsonify({'slugs': slugs})

if __name__ == '__main__':
    app.run(debug=True)
