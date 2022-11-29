# SCCBD - Cybersecurity

## RSA Example   
    npm i -D ts-node  
    npx ts-node ./test.ts

## Module generation  
    npx tsc --init  

### tsconfig.json  
- "target": "ES2020"  
- "module": "ES2020"  
- "declaration": "true"  
- "moduleResolution": "node"  

### package.json  
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
        "license": "ISC",
    }

### Transpilation into JS
    npx tsc  

### Import Module
    npm install --save ../path/to/mymodule  