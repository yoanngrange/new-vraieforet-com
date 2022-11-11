# Nicoll Presse

## Context

This app aims at momentarily replacing the web pages that we had with our previous press relations management agency, Schilling, here :
http://www.n-schilling.com/presse/communiques-de-presse/nicoll.html

![Schilling Website](https://github.com/yoanngrange/nicoll-presse/blob/master/docs/img/schilling.png?raw=true "Schilling")

There, were gathered a bulk of 86 press releases which respectively contained assets. These assets could be one or several PDFs and/or images. The press releases stored on Schilling website started being published in 2007. We stopped the collaboration with Schilling effectively on April 30th 2019.

We retrieved the contents of the 86 posts and stored the raw data on a spreadhseet. That way, if we have to migrate it to another platform later, it will be way easier.

This web app is also a good opportunity to train both Celena Riot and Eva Ory on HTML, CSS, JS, HTTP and continuous deployment.

It was also a good opportunity to use that content for search engine optimisations. As soon as Schilling will have unpublished its pages, there won't be duplicate content any longer.

## Data Source & API

Dataset comes from this Google spreadsheet : https://docs.google.com/spreadsheets/d/1VQsP-YT3MR5B48PN0p5vWL0_iz29o9OKlJiBg9WE6No/edit#gid=0

Which offers an out-of-the-box API with a JSON  at : https://spreadsheets.google.com/feeds/list/1VQsP-YT3MR5B48PN0p5vWL0_iz29o9OKlJiBg9WE6No/od6/public/values?alt=json

Access can be granted on demand by email at ygrange@aliaxis.com

Columns can be reordered without side effect on the app.

### Details for each column

* UUID	(UUID, just in case, no specifically used in the app)
* Date	(format : dd/mm/yyyy)
* Slug	(seo-friendly-title, formatted date and '.html' are added to the string at rebuild)
* Title (post title)	
* Keywords	(one or more singular words, can be empty)
* Text	(bulk post text, paragraphs are separated by double line-breaks)
* Photos	(filename of one or more images, i.e: cdp-0075-01.jpg, cdp-0075-02.jpg)
* Pdfs (filename of one or more PDFs, cdp-0017-01.pdf, can be empty)

### Important information

The entire (all tabs) Google Spreadsheet must be "Published to the web" and the "automatically republish when changes are made" checkbox checked.

## Technical stack

We needed an app that would generate a set of static html in order to be: performant, easily crawlable, simple to manage and maintain.

We also needed the app to simply read the json reply of the API, parse it and use its content through variables.

The code had to be as short and simple as possible in order to maintain it and to train the two coworkers previously mentionned.

For data management, we chose Google Sheets because it natively offers a Rest API, for free.

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
* /public contains all exposable assets (images, PDFs, favions, css, js,...) and generated static html files
* /node_modules contains all Node.JS modulesnecessarily for the app to build
* /templates contains the two files of the app who build the homepage of the app and one page per post

## Deployment

We needed something very reliable and on which we could deployed in a snap.

We needed a fully automated platform that would take care on its own of the monitoring, scaling, blue/green deployment and security patches and updates.

We chose to version on GitHub and continue deploy on Clever Cloud.

## Performance

Between the Schiling self-hosted Joomla and the Nicole Presse App, here are both Chrome inspector audit results:

Schilling Website           |  Nicoll Presse
:-------------------------:|:-------------------------:
![Schilling Website](https://github.com/yoanngrange/nicoll-presse/blob/master/docs/img/perf-schilling-nicoll.png?raw=true)  |  ![Nicoll Presse](https://github.com/yoanngrange/nicoll-presse/blob/master/docs/img/perf-presse-nicoll.png?raw=true)

Remaining progression margin for the Nicole Presse app is about http2 implementation and image lazy-loading.

Clever Cloud does not offer at the moment http2 implementation.

Even with the 86 images, we have a way better performance.

## Demos

### Edit & Rebuild Demo

Here is a short screencast of a simple spreadsheet edit and page rebuild:

![Edit and rebuild](https://github.com/yoanngrange/nicoll-presse/blob/master/docs/img/rebuild.gif?raw=true)


### Edit, Commit, Push & Deploy Demo

Here is a short screencast of an example of the duration of these different steps : edit, commit, push, deploy:

![Edit and rebuild](https://github.com/yoanngrange/nicoll-presse/blob/master/docs/img/deploy.gif?raw=true)

