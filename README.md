# Readme v2

## Context

Vraie Forêt SAS aims at managing its website through Airtable as a backend.

## Data

Dataset comes from a Github environment variable : AIRTABLE_API_JSON_URL (which points to : https://api.airtable.com/v0/appMVkRvOyMTQQuTN/species?api_key=keyABC123def456)

### Details for each column

* "Name" (common name of the plant)
* "Slug" (SEO friendly URI)
* "Latin" (latin name of the plant)
* "Images" (are 0, 1 or more photos, with the following structure)

```

Images
  0	
    id	"att99DUzJ6v3mA4o1"
    width	500
    height 500
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


* "Type" (list of 0, 1 or more attributes of the plant)


```

Type	
  0	"Feuillu"
  1	"Fruitier"
  2	"Haie"
  3	"Caduc"
```
* "Stratum" (the vegetation layer the plant belongs to)
* "Soil" (0, 1 or more type.s of supported soil types)
* "Exposure" (0, 1 or more type.s of supported sun exposures)
* "Description" (richtext string)
* "Wikipedia" (link to wikipedia artile, if any)
* "TechIllustration" (available technical illustration of the plant, if any)

