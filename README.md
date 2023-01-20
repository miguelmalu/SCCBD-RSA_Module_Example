# SCCBD - Cybersecurity

## RSA Example   
`npm i -D ts-node`  
`npx ts-node ./test.ts` 
> This will not work at the end of the tutorial, if needed, remove all except `index.ts`, `test.ts` and `/node_modules`.  

## ES Module generation  
### tsconfig generation
`npx tsc --init`  

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "node",
    "declaration": true,
  },
  "exclude": ["test.ts"]
}
```

### package.json  
```json
{
  "name": "example-rsa",
  "version": "0.1.0",
  "description": "My example RSA module",
  "main": "index.js",
  "type": "module",
  "scripts": {
      "test": "node test.js"
  },
  "author": "",
  "license": "ISC"
}
```

### Transpilation into JS
`npx tsc`  

## Dual Module generation 
In case we already have a complex CommonJS project, and we want to avoid having to modify it excessively, apart from exporting our module as ESM, which would be optimal together with a pure ESM project, we can also add another export as CommonJS, for the posed problem.  
If is not your case, just ignore this section.   

After following the previous steps, there are some modifications.  

### package.json  
<pre>
{
  <del>"type": "module"</del>
}
</pre>

```json
{
  "main": "./cjs/index.js",
  "browser": "./esm/index.js",
  "scripts": {
    "build:esm": "npx rimraf ./esm/* && tsc -m ES2020 --outDir esm",
    "build:cjs": "npx rimraf ./cjs/* && tsc -m commonjs --outDir cjs"
  },
  "exports": {
    ".": {
      "node": {
        "require": "./cjs/index.js",
        "import": "./esm/index.js",
        "module": "./esm/index.js"
      },
      "default": "./esm/index.js"
    }
  },
}
```
### Transpilation into JS
Run both:  
- **CommonJS**: `npm run build:cjs`  
- **ESM**: `npm run build:esm`  

## Import Module
`npm install --save ../path/to/module`  
