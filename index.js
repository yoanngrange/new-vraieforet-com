const fs = require('fs');
const axios = require('axios');
const handlebars = require('handlebars');
const express = require('express');
const enforce = require('express-sslify');
var Airtable = require('airtable');

var base = new Airtable({apiKey: '${{ env.AIRTABLE_API_JSON_URL }}'}).base('appMVkRvOyMTQQuTN');

base('produits-services').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 3,
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        console.log('Retrieved', record.get('Name'));
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});

const url = process.${{ env.AIRTABLE_API_JSON_URL }};

// Default data 
const defaultData = JSON.parse(fs.readFileSync('public/data.json', {
	encoding: 'utf8'
}));

// Read template for Handlebar
const indexHtmlTemplate = fs.readFileSync('templates/index.hbs', {
	encoding: 'utf8'
});
const postHtmlTemplate = fs.readFileSync('templates/post.hbs', {
	encoding: 'utf8'
});

const handlebarCompiledIndexTemplate = handlebars.compile(indexHtmlTemplate);
const handlebarCompiledPostTemplate = handlebars.compile(postHtmlTemplate);

function generateSite(url) {
	return axios.get(url)
	.then(response => response.data.feed.entry)
	.catch(err => defaultData.data.feed.entry)
	.then(entries => entries.filter(entryNotEmpty))
	.then(entries => entries.reverse().map(entryToPost))
	.then(posts => generateHtmls(posts))
	.then(htmls => writeFiles(htmls))
}

function entryNotEmpty(entry) {
	return entry.id && entry.id !== '';
}

function entryToPost(entry) {
	return {
		id: entry.id,
		name: entry.fields.Name.$t,
		slug: entry.fields.Slug.$t,
		latin: entry.fields.Latin.$t,
		images: (entry.fields.Images.$t || "").split(", ").filter(Images => Images !== ""),
		firstImage: (entry.fields.Images.$t || "").split(", ").filter(Images => Images !== "").shift(),
		types: (entry.fields.Type.$t || "").split(", ").filter(Type => Type !== ""),
		stratum: entry.fields.Stratum.$t,
		soil: (entry.fields.Soil.$t || "").split(", ").filter(Soil => Soil !== ""),
		exposure: (entry.fields.Exposure.$t || "").split(", ").filter(Exposure => Exposure !== ""),
		description: entry.fields.Description.$t.replace(/\n/g, '<br />'),
		wikipedia: entry.fields.Wikipedia.$t,	
		techIllustration: entry.fields.TechIllustration.$t,
	}
}

function generateHtmls(posts) {
	const indexHtml = generateIndex(posts);
	const postHtmls = generatePosts(posts);
	
	return postHtmls.concat(indexHtml);
}

function writeFiles(htmls) {
	htmls.forEach(html => {
		fs.writeFileSync(`public/${html.fileName}`, html.content, {
			encoding: 'utf8'
		})
	});
}

function generateIndex(posts) {
	const context = {
		posts: posts
	}
	return {
		fileName: 'index.html',
		content: handlebarCompiledIndexTemplate(context)
	};
}

function generatePosts(posts) {
	return posts.map(generatePost)
}

function generatePost(post) {
	const context = post
	return {
		fileName: post.slug,
		content: handlebarCompiledPostTemplate(context)
	}
}

generateSite(url);

const app = express();
if (process.env.NODE_ENV === 'production') {
app.use(enforce.HTTPS({ trustProtoHeader: true }));
}
app.use(express.static('public'));

app.get('/rebuild', function (req, res) {
	generateSite(url)
		.then(() => res.send('regen done'));
	
});

app.listen(process.env.PORT || 8080, () => {
	console.log(`i'm up!`);
})
