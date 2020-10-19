const fs = require('fs');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const { create, read, update, del, all } = require('./crud');

const optionDefinitions = [
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Display this usage guide.'
  },
  {
    name: 'create',
    type: String,
    description: 'The image to save',
    typeLabel: '<file>'
  },
  {
    name: 'read',
    type: Boolean,
    description: 'Fetch a cat by ID',
    typeLabel: '<boolean>'
  },
  {
    name: 'update',
    type: String,
    description: 'Update a cat by ID',
    typeLabel: '<file>'
  },
  {
    name: 'delete',
    type: Boolean,
    description: 'Delete a cat by ID',
    typeLabel: '<boolean>'
  },
  {
    name: 'all',
    type: Boolean,
    description: 'Fetch all cats in db',
    typeLabel: '<boolean>'
  },
  {
    name: 'id',
    type: String,
    description: 'The ID of a cat in the db',
    typeLabel: '<file>'
  },
];

const options = commandLineArgs(optionDefinitions);


// CREATE
if (options.create) {
  if (options.create == null) {
    return console.error(chalk.red('You must include a file!'));
  }

  const fileExists = fs.existsSync(options.create);

  if (!fileExists) {
    return console.error(chalk.red(`${options.create} does not exist.`));
  }

  return create(options.create);
}

// READ
if (options.read) {
  if (!options.id) { return console.error(chalk.red('You must include --id')); }

  return read(options.id);
}

// UPDATE
if (options.update) {
  if (!options.id) { return console.error(chalk.red('You must include --id')); }

  if (options.update == null) {
    return console.error(chalk.red('You must include a file!'));
  }

  const fileExists = fs.existsSync(options.update);

  if (!fileExists) {
    return console.error(chalk.red(`${options.update} does not exist.`));
  }

  return update(options.update, options.id);
}

// DELETE
if (options.delete) {
  if (!options.id) { return console.error(chalk.red('You must include --id')); }

  return del(options.id);
}

// ALL
if (options.all) {
  return all();
}

// HELP
if (options.help) {
  const usage = commandLineUsage([
    {
      header: 'A Simple Cat API',
      content: 'A simple RESTful API to upload cat images.'
    },
    {
      header: 'Options',
      optionList: optionDefinitions
    },
    {
      content: 'Project home: {underline https://github.com/rfarine/simple-api}'
    },
  ]);
  console.log(usage);
}
