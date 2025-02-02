const base = require('./base.cjs');
const react = require('./react.cjs');
const typescript = require('./typescript.cjs');

module.exports = [...base, ...typescript, ...react];
