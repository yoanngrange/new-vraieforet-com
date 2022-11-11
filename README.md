# Readme

## Context

Vraie Forêt SAS aims at managing its website through Airtable as a backend.

## Data

Dataset comes from a Github environment variable : AIRTABLE_API_JSON_URL (which points to : https://api.airtable.com/v0/appMVkRvOyMTQQuTN/species?api_key=keyABC123def456)

### Details for each column

* "Nom commun" (common name of the plant)
* "Slug"	(SEO friendly URI)
* "Nom latin" (latin name of the plant)
* Keywords	(one or more singular words, can be empty)
* Text	(bulk post text, paragraphs are separated by double line-breaks)
* Photos


Photos
0	
id	"att99DUzJ6v3mA4o1"
width	500
height	500
url	"https://v5.airtableusercontent.com/v1/10/10/1668196800000/lWarhwPixtm4_bvnQ2bPGQ/V5FnvHlTkRXkNUVoGH9wPHN4q-nsBmZ1AD56KkVTCUI1b9w3NLIqrbe8zEcvvJ6XNzNeBn9CV64bRwqedDD34l2c25r6u58nt2QdEkYObDretg-aAKEVoZvXqMLqGhZL/8nVKJL9Vr9EmJ4od36zOohhTf8W8zxtzeygY3lOoAPI"
filename	"ciste-cotonneuse_FR_500_0000399.jpg"
size	43894
type	"image/jpeg"
thumbnails	
small	
url	"https://v5.airtableuserc…a-dCux8mFvnhS8gNQ4s1waD0"
width	36
height	36
large	
url	"https://v5.airtableuserc…GSah2AaoUScmmt-51nnqnvTo"
width	500
height	500
full	
url	"https://v5.airtableuserc…EqfOv27TZ_ifUO0QkVvXxYKs"
width	3000
height	3000
1	
id	"att5lhS4tjiSYd79o"
width	500
height	500
url	"https://v5.airtableusercontent.com/v1/10/10/1668196800000/Kj5l8K1ipbQSKYiOWgcQ5w/ejzv6gHGA6MpTjYvDDOBrNudNOjsegWiuA22pSml6_xlEB03VEdDlTu3Fqvpu2SeGdwbhZ1ImjWtN6EBFQD7bTEe7izDowedVjv15a7h-EtArNtjaQTSObKMntQVfZTM/R3JA3gP4Ht79rKFv8NIVZ7uIdIuSJ4wpvxHgOCD21TA"
filename	"ciste-cotonneuse_FR_500_0000402.jpg"
size	50266
type	"image/jpeg"
thumbnails	
small	
url	"https://v5.airtableuserc…1huIaoDxMuKXQDHq9wTbntOs"
width	36
height	36
large	
url	"https://v5.airtableuserc…yEKrOx2ZYbQs8Sysc8OrGsJw"
width	500
height	500
full	
url	"https://v5.airtableuserc…evSEu6pqw9N2YZBXzOkHW0Hw"
width	3000
height	3000
```

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

