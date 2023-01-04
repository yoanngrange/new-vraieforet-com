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

export const files = [
  {
    templateFile: "index.njk",
    distFile: "index.html",
    meta: () => ({
      title: "Accueil",
    }),
    datasource: {
      services: services.withConstraints({
        filterByFormula: "{Published} = '1'",
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
      footerCommunes: communes.withConstraints({
        filterByFormula: "{Department} = '44'",
        sort: [{ field: "Name", direction: "asc" }],
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
      footerCommunes: communes.withConstraints({
        filterByFormula: "{Department} = '44'",
        sort: [{ field: "Name", direction: "asc" }],
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
      footerCommunes: communes.withConstraints({
        filterByFormula: "{Department} = '44'",
        sort: [{ field: "Name", direction: "asc" }],
      }),
    },
  },
  {
    templateFile: "commune.njk",
    distFile: (slug) => `plantation/${slug}.html`,
    meta: (commune) => ({
      title: "Plantation forestières à ".commune,
    }),
    multiPages: true,
    datasource: {
      rows: communes,
      footerCommunes: communes.withConstraints({
        filterByFormula: "{Department} = '44'",
        sort: [{ field: "Name", direction: "asc" }],
      }),
    },
  },
  {
    templateFile: "communes.njk",
    distFile: "plantation/index.html",
    meta: () => ({
      title: "Plantation d'arbres en Loire-Atlantique, en Maine et Loire et en Vendée",
      description: "Vous souhaitez planter une forêt, une micro-forêt, une haie bocagère / champêtre ou encore un verger ? Contactez Vraie Forêt et visitons ensemble la parcelle de votre projet.",
      keywords: "plantation commune, plantation ville, plantation municipalité, plantation forestière".commune,
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
      footerCommunes: communes.withConstraints({
        filterByFormula: "{Department} = '44'",
        sort: [{ field: "Name", direction: "asc" }],
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
      footerCommunes: communes.withConstraints({
        filterByFormula: "{Department} = '44'",
        sort: [{ field: "Name", direction: "asc" }],
      }),
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
      footerCommunes: communes.withConstraints({
        filterByFormula: "{Department} = '44'",
        sort: [{ field: "Name", direction: "asc" }],
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
      footerCommunes: communes.withConstraints({
        filterByFormula: "{Department} = '44'",
        sort: [{ field: "Name", direction: "asc" }],
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
      footerCommunes: communes.withConstraints({
        filterByFormula: "{Department} = '44'",
        sort: [{ field: "Name", direction: "asc" }],
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
      footerCommunes: communes.withConstraints({
        filterByFormula: "{Department} = '44'",
        sort: [{ field: "Name", direction: "asc" }],
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
      footerCommunes: communes.withConstraints({
        filterByFormula: "{Department} = '44'",
        sort: [{ field: "Name", direction: "asc" }],
      }),
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
      footerCommunes: communes.withConstraints({
        filterByFormula: "{Department} = '44'",
        sort: [{ field: "Name", direction: "asc" }],
      }),
    },
  },
];
