import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE
);

// ==== Actualites
export const actualites = getDatas({
  tabName: "actualites",
  mapper: actualiteMapper,
});

function actualiteMapper(record) {
  return {
    name: record.get("Name"),
    slug: record.get("Slug"),
    date: new Date(record.get("Date")).toLocaleDateString("fr-FR"),
    header: record.get("Header"),
    content: record.get("Content"),
    image: record.get("Image") && record.get("Image")[0],
    thumb: record.get("ImageThumb") && record.get("ImageThumb")[0],
    youtube: record.get("Youtube"),
  };
}

// ==== Communes
export const communes = getDatas({
  tabName: "communes",
  mapper: communeMapper,
});

function communeMapper(record) {
  return {
    name: record.get("Name"),
    slug: record.get("Slug"),
    department: record.get("Department"),
  };
}

// ==== Essences
export const essences = getDatas({
  tabName: "essences",
  mapper: essencesMapper,
});

export const essencesGroup = getDatas({
  tabName: "essences",
  mapper: essencesMapper,
  transform: (records) => {
    const groups = records.reduce((memo, record) => {
      const letter = record.latin.charAt(0);
      const memoLetter = memo[[letter]] || {
        letter,
        essences: [],
      };
      memoLetter.essences.push(record);

      return { ...memo, [letter]: memoLetter };
    }, {});
    return Object.values(groups);
  },
});

function essencesMapper(record) {
  return {
    name: record.get("Name"),
    latin: record.get("Latin"),
    slug: record.get("Slug"),
    images: record.get("Images"),
    image: record.get("Images") && record.get("Images")[0],
    types: record.get("Type"),
    stratum: record.get("Stratum"),
    soils: record.get("Soil"),
    exposures: record.get("Exposure"),
    description: record.get("Description"),
    wikipedia: record.get("Wikipedia"),
    techIllustration: record.get("TechIllustration") && record.get("TechIllustration")[0],
  };
}

// ==== Methode
export const methodes = getDatas({
  tabName: "methode",
  mapper: methodeMapper,
});

function methodeMapper(record) {
  return {
    name: record.get("Name"),
    text: record.get("Text"),
    image: record.get("Image") && record.get("Image")[0],
  };
}

// ==== Projets
export const projets = getDatas({
  tabName: "projets",
  mapper: projetMapper,
});

function projetMapper(record) {
  return {
    name: record.get("Name"),
    order: record.get("Order"),
    text: record.get("Text"),
    image: record.get("Image") && record.get("Image")[0],
    thumb: record.get("ImageThumb") && record.get("ImageThumb")[0],
    link: record.get("Link"),
    call: record.get("Call"),
  };
}

// ==== Questions Frequentes
export const questionsFrequentes = getDatas({
  tabName: "questions-frequentes",
  mapper: questionsFrequentesMapper,
});

function questionsFrequentesMapper(record) {
  return {
    id: record.id,
    question: record.get("Question"),
    answer: record.get("Answer"),
    weight: record.get("Weight"),
  };
}

// ==== Realisations
export const realisations = getDatas({
  tabName: "realisations",
  mapper: realisationMapper,
});

function realisationMapper(record) {
  return {
    name: record.get("Name"),
    slug: record.get("Slug"),
    date: new Date(record.get("Date")).toLocaleDateString("fr-FR"),
    photo: record.get("Photos") && record.get("Photos")[0],
    thumb: record.get("ImgeThumb") && record.get("ImgeThumb")[0],
    context: record.get("Context"),
    testimonial: record.get("Testimonial"),
    authors: record.get("Authors"),
    department: record.get("Department"),
    quantitySurface: record.get("QuantitySurface"),
    soil: record.get("Soil"),
    species: record.get("Species"),
    ph: record.get("Ph"),
  };
}

// ==== Services
export const services = getDatas({
  tabName: "produits-services",
  mapper: servicesMapper,
});

function servicesMapper(record) {
  return {
    name: record.get("Name"),
    order: record.get("Order"),
    published: record.get("Published"),
    slug: record.get("Slug"),
    header: record.get("Header"),
    text: record.get("Text"),
    image: record.get("Image") && record.get("Image")[0],
    thumb: record.get("ImageThumb") && record.get("ImageThumb")[0],
    targets: record.get("Targets"),
  };
}

//

// ==== Technical stuff

function getDatas({ tabName, mapper, transform = (d) => d }) {
  const tab = base(tabName);

  async function getRecords({ sort, limit, filterByFormula } = {}) {
    let airtableConfig = { view: "Grid view" };
    if (sort) {
      airtableConfig = { ...airtableConfig, sort };
    }
    if (limit) {
      airtableConfig = { ...airtableConfig, maxRecords: limit };
    }
    if (filterByFormula) {
      airtableConfig = { ...airtableConfig, filterByFormula };
    }

    return new Promise((resolve, reject) => {
      let allRecords = [];
      tab.select(airtableConfig).eachPage(
        (records, fetchNextPage) => {
          allRecords = allRecords.concat(records.map(mapper));
          fetchNextPage();
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(transform(allRecords));
          }
        }
      );
    });
  }

  return {
    withConstraints: ({ sort, limit, filterByFormula } = {}) => {
      return {
        get: () => getRecords({ sort, limit, filterByFormula }),
      };
    },
    get: () => getRecords(),
  };
}
