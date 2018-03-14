const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
module.exports = {
	input: 'src/index.js',
	plugins: [
		resolve(),
		commonjs(),
		babel({
			runtimeHelpers: true,
			exclude: 'node_modules/**'
		})
	],
	output: {
		name:'vck',
		format: 'cjs', // cjs, amd, es, iife, umd
		file: 'dist/vck.js'
	}
}; 
