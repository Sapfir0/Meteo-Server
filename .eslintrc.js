module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"

    },
    "rules": {
        "no-console": "off",
        "no-undef": "warn", // убрать! добавлено только из-за аутизма error    'Chart' is not defined 
        "quotes": ["warn", "double"],
        "no-unused-vars": [
            "warn", 
            { 
                "vars": "all", 
                "args": "after-used", 
                "ignoreRestSiblings": false 
            }
        ]

    }
    
};