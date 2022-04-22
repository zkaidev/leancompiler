let Compiler = require('./compiler.js');


let testcase = [
  '()',
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
for(tc in testcase) {
  let tokens = compiler.tokenizer('(a 2)');
  let ats = compiler.parser(tokens);
  console.log(JSON.stringify(ats, null, '  '));
}
