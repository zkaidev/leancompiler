let Compiler = require('./compiler.js');


let testcase = [
  '(add)',
  '(add 1)',
  '(add 1 2)',
  '(add 1 (mul 2 3))',
  '(add 1 (mul 2 3) 4)',
  '(add 1 "x")',
  '(add 1 "x") (sub 2 3)',
  '(add 1 "x") (sub 2 3) (mul "y" 3)',
];

let compiler = new Compiler();
for(tc of testcase) {
  console.log('\nSource code:\n' + tc);
  let tokens = compiler.tokenizer(tc);
  let ats = compiler.parser(tokens);
  let code = compiler.codegenerator(ats);
  // console.log(JSON.stringify(ats, null, '  '));
  console.log('Target code:\n' + code);
}