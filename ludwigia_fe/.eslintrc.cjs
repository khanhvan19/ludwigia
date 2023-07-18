module.exports = {
    env: { browser: true, es2020: true, node: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended'
    ],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: [
        'react',
        'react-hooks',
        'react-refresh'
    ],
    rules: {
        'react-refresh/only-export-components': 'warn', //validate component's safety updated (in production environment)
        'react-hooks/rules-of-hooks': 'error', //check syntax react hooks is bad
        'react-hooks/exhaustive-deps': 'warn', //check dependencies of react hook is full
        'react/prop-types': 0, //dismiss validate type of component parameters (props)
        'react/display-name': 0, //dismiss show component's name is error in console.log

        'no-restricted-imports': [
            'error',
            { 'patterns': ['@mui/*/*/*'] }
        ], //check import MUI Components more than 2 level

        'no-console': 1, //detect redundant console.log in source code
        'no-lonely-if': 1, //detect if(*)...else { if(*) } instead of if(*)...else if(*)
        'no-unused-vars': 1, //detect declared variables but not use
        'no-trailing-spaces': 1, //detect redundant whitespace in end line
        'no-multi-spaces': 1, //detect adjacent whitespace more than 2
        'no-multiple-empty-lines': 1, //detect adjacent empty line more than 2
        'space-before-blocks': ['error', 'always'], //detect not whitespace between 2 block, ex: if(*){}, func nane(){},... is bad
        'object-curly-spacing': [1, 'always'], //detect not whitespace between {} and content, ex: {key: "value"},... is bad
        'indent': ['warn', 4], //detect redundant whitespace in start line (tab)
        'quotes': ['warn', 'single'], //detect using "" intead of '' in declared variables
        'array-bracket-spacing': 1, //detect redundant whitespace in array
        'linebreak-style': 0, //not show error with syntax linebreak between different operating systems (/r/n in WindosOS, /n in LinuxOS)
        'no-unexpected-multiline': 'warn', //detect redundant linebreak
        'keyword-spacing': 1, //detect not whitespace before or after keyword, ex: {...}else {...} is bad
        'comma-dangle': 1, //detect redundant whitespace in position last key-value of object
        'comma-spacing': 1, //detect wrong divide between 2 variables/key-value of object, ex: foo ,bar is bad
        'arrow-spacing': 1 //detect wrong whitespace in arrow function, ex: ()=>{}, ()=> {}, () =>{} is bad
    }
}
