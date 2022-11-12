const fs = require('fs');
const axios = require('axios');
const handlebars = require('handlebars');
const express = require('express');
const enforce = require('express-sslify');

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
		commonName: entry.fields.NomCommun.$t,
		slug: entry.fields.slug.$t,
		latinName: entry.fields.NomLatin.$t,
		photos: (entry.fields.photos.$t || "").split(", ").filter(photo => photo !== ""),
		firstPhoto: (entry.fields.photos.$t || "").split(", ").filter(photo => photo !== "").shift(),
		types: (entry.fields.type.$t || "").split(", ").filter(type => type !== ""),
		strate: entry.fields.strate.$t,
		sol: (entry.fields.sol.$t || "").split(", ").filter(sol => sol !== ""),
		exposition: (entry.fields.exposition.$t || "").split(", ").filter(exposition => exposition !== ""),
		description: entry.fields.description.$t.replace(/\n/g, '<br />'),
		wikipedia: entry.fields.wikipedia.$t,	
		plancheBotanique: entry.fields.plancheBotanique.$t,
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
