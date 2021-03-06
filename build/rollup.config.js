import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
module.exports = {
	input: 'src/index.js',
	plugins: [
		resolve(),
		commonjs(),
		babel({
			runtimeHelpers: true,
			exclude: 'node_modules/**'
		}),
	],
	output: {
		name:'vck',
		format: 'cjs', // cjs, amd, es, iife, umd
		file: 'dist/vck.js',
	}
}
