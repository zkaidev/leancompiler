
class Compiler {

  /*
   * 5 tokens: (, ), number, string, name
   */
  tokenizer(input) {
    let lookforward = 0;
    let tokens = [];
 
    while(lookforward < input.length) {
      let char = input[lookforward++];

      // ignore whitespace char
      let regWhite = /\s/;
      while(regWhite.test(char) && lookforward < input.length) {
        char = input[lookforward++];
      }

      // token (
      if(char === '(') {
        tokens.push({ type: '(' });
        continue;
      }

      // token )
      if(char === ')') {
        tokens.push({ type: ')' });
        continue;
      }

      // token number
      let regNumber = /[0-9]/
      if(regNumber.test(char)) {
        let value = '';
        do {
          value += char;
          char = input[lookforward++];
        } while(regNumber.test(char));
        tokens.push({ type: 'number', value: value });
        lookforward--;
      }

      // token string
      if(char === '"') {
        char = input[lookforward++];
        let value = '';
        while(char !== '"') {
          value += char;
          char = input[lookforward++];
        }
        tokens.push({ type: 'string', value: value });
      }

      // token name
      let regLetter = /[a-zA-Z]/;
      if(regLetter.test(char)) {
        let value = '';
        do {
          value += char;
          char = input[lookforward++];
        } while(regLetter.test(char));
        tokens.push({ type: 'name', value: value });
        lookforward--;
      }

    }

    return tokens;
  }


  /*
   * Program -> Stmts
   * Stmts   -> Expr Stmts | ε
   * Expr    -> ( name Params )
   * Params  -> digit Params | string Params | Expr Params | ε
   */
  parser(tokens) {
    let lookforward = 0;

    function stmts() {
      let body = [];
      if(token().type === '(') {
        body.push(expr());
        body.push(...stmts());
      }
      return body;
    }

    function expr() {
      match('(');
      let value = token().value;
      match('name');
      let ps = params();
      match(')');
      return { type: 'expr', value: value, params: ps };
    }

    function params() {
      let t = token();
      let ps = [];
      switch(t.type) {
        case 'number':
          ps.push({ type: 'number', value: t.value });
          match('number');
          ps.push(...params());
          break;
        case 'string':
          ps.push({ type: 'string', value: t.value });
          match('string');
          ps.push(...params());
          break;
        case '(':
          ps.push(expr());
          ps.push(...params());
          break;
        default:
          // empty param here
      }
      return ps;
    }

    function match(type) {
      if(token().type === type) {
        lookforward++;
      } else {
        throw new TypeError('Syntax error: ' + type);
      }
    }

    function token() {
      if(lookforward < tokens.length) {
        return tokens[lookforward];
      } else {
        return { type: 'none' };
      }
    }

    let root = {
      type: 'program',
      body: stmts(),
    };
    return root;
  }

}

module.exports = Compiler;
