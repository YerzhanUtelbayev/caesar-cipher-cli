const { Command } = require('commander')

const program = new Command().storeOptionsAsProperties(false)
program.version('0.0.1')

program
  .option('-s, --shift <number>', 'a shift')
  .option('-i, --input [file]', 'an input file')
  .option('-o, --output [file]', 'an output file')
  .requiredOption('-a, --action <type>', 'an action encode/decode')

module.exports = program
