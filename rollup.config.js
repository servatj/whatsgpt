import esbuild from 'rollup-plugin-esbuild'
import pkg from './package.json' assert { type: 'json' }

export default [
  {
    input: `src/index.ts`,
    plugins: [esbuild()],
    output: [
      {
        file: `dist/index.js`,
        format: 'es'
      }
    ]
  }
]
