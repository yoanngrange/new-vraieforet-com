# Readme

## Context

This app aims at momentarily replacing the web pages that we had with our previous press relations management agency, Schilling, here :
http://www.n-schilling.com/presse/communiques-de-presse/nicoll.html

![Schilling Website](https://github.com/yoanngrange/new-vraieforet-com/blob/main/docs/img/schilling.png?raw=true "Schilling")

There, were gathered a bulk of 86 press releases which respectively contained assets. These assets could be one or several PDFs and/or images. The press releases stored on Schilling website started being published in 2007. We stopped the collaboration with Schilling effectively on April 30th 2019.

We retrieved the contents of the 86 posts and stored the raw data on a spreadhseet. That way, if we have to migrate it to another platform later, it will be way easier.

This web app is also a good opportunity to train both Celena Riot and Eva Ory on HTML, CSS, JS, HTTP and continuous deployment.

It was also a good opportunity to use that content for search engine optimisations. As soon as Schilling will have unpublished its pages, there won't be duplicate content any longer.

## Data

Dataset comes from a Github environment variable : AIRTABLE_API_JSON_URL (which points to : https://api.airtable.com/v0/appMVkRvOyMTQQuTN/species?api_key=keyABC123def456)

### Details for each column

* UUID	(UUID, just in case, no specifically used in the app)
* Date	(format : dd/mm/yyyy)
* Slug	(seo-friendly-title, formatted date and '.html' are added to the string at rebuild)
* Title (post title)	
* Keywords	(one or more singular words, can be empty)
* Text	(bulk post text, paragraphs are separated by double line-breaks)
* Photos	(filename of one or more images, i.e: cdp-0075-01.jpg, cdp-0075-02.jpg)
* Pdfs (filename of one or more PDFs, cdp-0017-01.pdf, can be empty)


For the lower layer, we chose Node.JS so we could rely on a very simple, usable and open source server-side basis.

For variables manipulation, we chose Handlebars which is very convenient and covers approximatively all the use cases.
All the rest is pure Vanilla JS.

Therefore we chose to exploit the following node modules : 
* FS
* Axios
* Handlebars
* Express
* Express-SSLify

For the front, we chose Bootstrap 4.3.1

## File system 

* /docs contains a few assets for app documentation purposes
* /public contains all exposable assets (images, PDFs, favicons, css, js,...) and generated static html files
* /node_modules contains all Node.JS modules necessary for the app to build
* /templates contains the two files of the app who build the homepage of the app and one page per post

## Demos

### Edit & Rebuild Demo

Here is a short screencast of a simple spreadsheet edit and page rebuild:

![Edit and rebuild](https://github.com/yoanngrange/new-vraieforet-com/blob/main/docs/img/rebuild.gif?raw=true)


### Edit, Commit, Push & Deploy Demo

Here is a short screencast of an example of the duration of these different steps : edit, commit, push, deploy:

![Edit and rebuild](https://github.com/yoanngrange/new-vraieforet-com/blob/main/docs/img/deploy.gif?raw=true)

