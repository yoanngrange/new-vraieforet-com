import path from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import nunjucks from "nunjucks";
import njmarkdown from "nunjucks-markdown";
import * as marked from "marked";

const __dirname = path.resolve();

const env = nunjucks.configure("templates", { autoescape: true });
njmarkdown.register(env, marked.parse);

export async function renderFiles(files) {
  return Promise.all(
    files.map(async (file) => {
      // let distFile = file.distFile;
      if (file.multiPages) {
        if (typeof file.distFile !== "function") {
          throw new Error(
            `For ${file.templateFile}, distFile must be a function taking the slug as parameter and returning a string based on the slug`
          );
        }

        if (!file.datasource.rows) {
          throw new Error(
            `For ${file.templateFile}, rows must be defined in dataSource, each rows is a page`
          );
        }

        const rows = await file.datasource.rows.get();

        rows.forEach((row) => {
          generateFile({
            context: {
              meta: file.meta(row.name),
              __filename: file.templateFile,
              row,
            },
            distFile: file.distFile(row.slug),
            templateFile: file.templateFile,
          });
        });
      } else {
        const context = (
          await Promise.all(
            Object.keys(file.datasource).map(async (key) => {
              const value = await file.datasource[key].get();
              return { [key]: value };
            })
          )
        ).reduce((memo, value) => ({ ...memo, ...value }), {});

        generateFile({
          context: {
            ...context,
            meta: file.meta(),
            __filename: file.templateFile,
          },
          distFile: file.distFile,
          templateFile: file.templateFile,
        });
      }
    })
  );
}

function generateFile({ context, distFile, templateFile }) {
  const allPaths = distFile.split("/");

  const dist = path.join(__dirname, "dist");
  if (!existsSync(dist)) {
    mkdirSync(dist);
  }

  const css = path.join(__dirname, "css");
  if (!existsSync(css)) {
    mkdirSync(css);
  }

  if (allPaths.length > 1) {
    const [, ...paths] = allPaths.reverse();
    const dir = path.join(dist, ...paths.reverse());

    if (!existsSync(dir)) {
      mkdirSync(dir);
    }
  }

  const htmlContent = nunjucks.render(templateFile, context);
  writeFileSync(`dist/${distFile}`, htmlContent, {
    encoding: "utf8",
  });
}
