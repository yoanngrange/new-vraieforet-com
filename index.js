import "./env.js";

import express from "express";
import {
  actualites,
  communes,
  essences,
  essencesGroup,
  methodes,
  projets,
  questionsFrequentes,
  realisations,
  services,
} from "./data.js";
import { renderFiles } from "./render.js";

const files = [
  {
    templateFile: "index.njk",
    distFile: "index.html",
    meta: () => ({
      title: "Accueil",
    }),
    datasource: {
      services: services.withConstraints({
        sort: [{ field: "Order", direction: "asc" }],
      }),
      methodes: methodes.withConstraints({
        sort: [{ field: "Name", direction: "asc" }],
      }),
      realisations: realisations.withConstraints({
        limit: 6,
        sort: [{ field: "Date", direction: "desc" }],
      }),
      questionsFrequentes: questionsFrequentes.withConstraints({
        limit: 3,
        sort: [{ field: "Weight", direction: "desc" }],
      }),
      actualites: actualites.withConstraints({
        limit: 3,
        sort: [{ field: "Date", direction: "desc" }],
      }),
    },
  },
  {
    templateFile: "actualites.njk",
    distFile: "actualites/index.html",
    meta: () => ({
      title: "Actualités",
    }),
    datasource: {
      actualites: actualites.withConstraints({
        sort: [{ field: "Date", direction: "desc" }],
      }),
    },
  },
  {
    templateFile: "actualite.njk",
    distFile: (slug) => `actualites/${slug}.html`,
    meta: (actualite) => ({
      title: actualite,
    }),
    multiPages: true,
    datasource: {
      rows: actualites,
    },
  },
  {
    templateFile: "commune.njk",
    distFile: (slug) => `plantations/${slug}.html`,
    meta: (commune) => ({
      title: commune,
    }),
    multiPages: true,
    datasource: {
      rows: communes,
    },
  },
  {
    templateFile: "communes.njk",
    distFile: "communes/index.html",
    meta: () => ({
      title: "Communes",
    }),
    datasource: {
      loireAtlantique: communes.withConstraints({
        filterByFormula: "{Department} = '44'",
      }),
      vendee: communes.withConstraints({
        filterByFormula: "{Department} = '85'",
      }),
      maineEtLoire: communes.withConstraints({
        filterByFormula: "{Department} = '49'",
      }),
      ileEtVilaine: communes.withConstraints({
        filterByFormula: "{Department} = '35'",
      }),
    },
  },
  {
    templateFile: "essence.njk",
    meta: (essence) => ({
      title: essence,
    }),
    distFile: (slug) => `essences/${slug}.html`,
    multiPages: true,
    datasource: {
      rows: essences,
    },
  },
  {
    templateFile: "essences.njk",
    distFile: "essences/index.html",
    meta: () => ({
      title: "Essences",
    }),
    datasource: {
      essencesGroup: essencesGroup.withConstraints({
        filterByFormula: "NOT({Latin} = '')",
        sort: [{ field: "Latin", direction: "asc" }],
      }),
    },
  },
  {
    templateFile: "questions-frequentes.njk",
    distFile: "questions-frequentes/index.html",
    meta: () => ({
      title: "Questions fréquentes",
    }),
    datasource: {
      questionsFrequentes: questionsFrequentes.withConstraints({
        sort: [{ field: "Weight", direction: "desc" }],
      }),
    },
  },
  {
    templateFile: "projets.njk",
    distFile: "projets/index.html",
    meta: () => ({
      title: "Projets",
    }),
    datasource: {
      projets: projets.withConstraints({
        sort: [{ field: "Order", direction: "asc" }],
      }),
    },
  },
  {
    templateFile: "realisations.njk",
    distFile: "realisations/index.html",
    meta: () => ({
      title: "Réalisations",
    }),
    datasource: {
      realisations: realisations.withConstraints({
        sort: [{ field: "Date", direction: "desc" }],
      }),
    },
  },
  {
    templateFile: "realisation.njk",
    distFile: (slug) => `realisations/${slug}.html`,
    meta: (realisation) => ({
      title: realisation,
    }),
    multiPages: true,
    datasource: {
      rows: realisations,
    },
  },
  {
    templateFile: "service.njk",
    distFile: (slug) => `services/${slug}.html`,
    meta: (service) => ({
      title: service,
    }),
    multiPages: true,
    datasource: {
      rows: services,
    },
  },
];

renderFiles(files).then(() => console.log("done"));

const app = express();
app.use(express.static("dist"));

app.get("/rebuild", function (req, res) {
  renderFiles(files).then(() => res.send("done"));
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`i'm up!`);
});
