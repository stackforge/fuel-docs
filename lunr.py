#!/usr/bin/env python

import glob, ntpath, random, json
from bs4 import BeautifulSoup

exclude = ['_build/html/search.html', '_build/html/index.html', '_build/html/index_content.html', '_build/html/contents.html', '_build/html/genindex.html', '_build/html/terminology.html']
files = glob.glob('_build/html/*.html')

for remove in exclude:
  if remove in files: files.remove(remove)

doc = []

def formatheading(filename, headings, guide, type):
  title = headings.text[:-1]
  parent = headings.parent
  url = filename + '#' + headings.parent.attrs['id']

  if type == 'h2':
    for tag in parent.find_all('h2'):
      tag.replaceWith('')
    for tag in parent.find_all('h3'):
      tag.parent.replaceWith('')
  else:
    for tag in parent.find_all('h3'):
      tag.replaceWith('')
    for tag in parent.find_all('h4'):
      tag.replaceWith('')

  body = parent.get_text(" ", strip=True)

  return {
    "title": title,
    "guide": guide,
    "url": url,
    "body": body.replace('\n', ' ')
  }

for file in files:
  filename = ntpath.basename(file)
  h2 = BeautifulSoup(open(file), 'html.parser')
  h3 = BeautifulSoup(open(file), 'html.parser')

  for title in h2.findAll('h1'):
    guide = title.text[:-1]

  for headings in h3.findAll('h3'):
    result = formatheading(filename, headings, guide, 'h3')
    if result['body']:
      doc.append(result)

  for headings in h2.findAll('h2'):
    result = formatheading(filename, headings, guide, 'h2')
    if result['body']:
      doc.append(result)

with open('_build/html/_static/data.json', 'w') as outfile:
    json.dump(doc, outfile)