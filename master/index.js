'use strict';

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const { markdown } = require('markdown');

const CONST = {
  theme: 'saf',
  themeDirectory: path.join(__dirname, '../theme'),
  themeFile: 'index.html',
  stories: path.join(__dirname, '../stories'),
  output: path.join(__dirname, '../docs'),
  pageRoute: 'page',
};

function interpolate(str, dict) {
  for (let key of Object.keys(dict)) {
    str = str.replace(
      new RegExp(`{{\\s*${ key }\\s*}}`, 'im'),
      dict[key]
    );
  }

  return str;
}

require('yargs') // eslint-disable-line
  .command(
    'build',
    'builds awesomeness',
    (yargs) => {
      return yargs
        .option('theme', {
          describe: 'choose a theme',
          alias: 't',
          default: CONST.theme,
        })
        .option('stories', {
          describe: 'stories directory',
          alias: 's',
          default: CONST.stories,
          normalize: true,
        })
        .option('output', {
          describe: 'output directory',
          alias: 'o',
          default: CONST.output,
          normalize: true,
        })
        .option('themeDir', {
          describe: 'theme directory',
          normalize: true,
          default: CONST.themeDirectory,
        })
        .option('themeFile', {
          describe: 'theme file',
          default: CONST.themeFile,
        });
    },
    async (argv) => {
      const { theme, themeDir, themeFile, stories, output } = argv;
      const themePath = path.join(themeDir, theme, themeFile);

      const spinner = ora('Loading unicorns');
      spinner.color = 'yellow';
      spinner.start();

      const themeExists = await fs.pathExists(themePath);
      const storiesExist = await fs.pathExists(stories);
      const outputExists = await fs.pathExists(output);

      if (!themeExists) {
        spinner.fail('Seems you\'re trying to use wrong theme.');
        process.exit(1);
      } else if (!storiesExist) {
        spinner.fail('We\'re missing stories.');
        process.exit(1);
      } else if (!outputExists) {
        spinner.fail('We can\'t build into nowhere.');
        process.exit(1);
      }

      spinner.color = 'green';
      spinner.text = 'Cleanup destination folder';

      await fs.emptyDir(output);
      await fs.writeFile(path.join(output, '.gitignore'), '');

      spinner.text = 'Copy theme content to destination';
      await fs.copy(
        path.join(themeDir, theme),
        output,
        { filter: f => path.basename(f) !== themeFile }
      );

      const template = await fs.readFile(themePath);
      let storiesFiles = await fs.readdir(stories);
      storiesFiles = storiesFiles
        .filter(s => /\.md$/i.test(s))
        .sort((a, b) => {
          const na = parseInt(a.replace(/[^0-9]+/, ''));
          const nb = parseInt(b.replace(/[^0-9]+/, ''));

          return a > b ? -1 : 1;
        });

      spinner.text = `Prepare stories (${ chalk.blue(storiesFiles.length) }): ${ chalk.gray(storiesFiles.join(', ')) }`;

      for (let i = 0; i < storiesFiles.length; i++) {
        const isIndex = i === 0;
        const storiesFile = path.join(stories, storiesFiles[i]);
        const rawContent = await fs.readFile(storiesFile);
        const content = markdown.toHTML(rawContent.toString());
        const html = interpolate(template.toString(), {
          content,
          total: storiesFiles.length,
          prev: i > 1
            ? path.basename(storiesFiles[i - 1], '.md') + '.html'
            : 'index.html',
          next: storiesFiles.length <= i + 1
            ? isIndex ? 'index.html' : path.basename(storiesFiles[i], '.md') + '.html'
            : path.basename(storiesFiles[i + 1], '.md') + '.html',
        });
        
        const storyFile = path.join(
          output,
          i === 0 ? 'index.html' : path.basename(storiesFiles[i], '.md') + '.html'
        );

        await fs.outputFile(storyFile, html);
      }

      spinner.succeed(`${ storiesFiles.length } stor[y|ies] [is|are] ready`);
    }
  )
  .command({
    command: '$0',
    handler: () => console.info(
      chalk.green('Use'),
      chalk.blue('--help'),
      chalk.green('to see usage options')
    ),
  })
  .fail((msg, error) => {
    console.error(chalk.red(msg || error.message));
    process.exit(1);
  })
  .help('h')
  .alias('h', 'help')
  .epilog('Build w/ ❤ by some guys')
  .argv;
