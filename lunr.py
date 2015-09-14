import glob, ntpath, random, json
from bs4 import BeautifulSoup

exclude = ['_build/html/search.html', '_build/html/index.html', '_build/html/index_content.html', '_build/html/contents.html', '_build/html/genindex.html', '_build/html/terminology.html']
files = glob.glob('_build/html/*.html')

for remove in exclude:
  if remove in files: files.remove(remove)

doc = []

for file in files:
  filename = ntpath.basename(file)
  soup = BeautifulSoup(open(file), 'html.parser')

  for headings in soup.findAll('h2'):
    parent = headings.parent
    url = filename + '#' + headings.parent.attrs['id']

    for tag in parent.find_all('h2'):
      tag.replaceWith('')
    for tag in parent.find_all('h3'):
      tag.replaceWith('')
    for tag in parent.find_all('h4'):
      tag.replaceWith('')

    body = parent.get_text(" ", strip=True)

    record = {
      "title": headings.text[:-1],
      "url": url,
      "body": body
    }

    doc.append(record)

with open('_build/html/_static/data.json', 'w') as outfile:
    json.dump(doc, outfile)