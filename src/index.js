module.exports = function check(str, bracketsConfig) {
  return testBrackets(str, bracketsConfig);
}

var createOpenClosePairs = function(bracketsConfig) {
  var r = {};
  for (var i=0; i<bracketsConfig.length; i++) {
    var pair = bracketsConfig[i];
    r[pair[0]] = pair[1];
  }
  return r;
}
// console.log(JSON.stringify(createOpenClosePairs([ [ '(', ')' ] ])));

var createCloseOpenPairs = function(bracketsConfig) {
  var r = {};
  for (var i=0; i<bracketsConfig.length; i++) {
    var pair = bracketsConfig[i];
    r[pair[1]] = pair[0];
  }
  return r;
}

var testBrackets = function(str, bracketsConfig) {
  var openClosePairs = createOpenClosePairs(bracketsConfig);
  var closeOpenPairs = createCloseOpenPairs(bracketsConfig);

  var stack = [];

  for (var i=0; i<str.length; i++) {
    var symbol = str[i];
    var closeBracket = openClosePairs[symbol];
    var openBracket = closeOpenPairs[symbol];
    // console.log(symbol, closeBracket, openBracket);

    if (closeBracket && openBracket) {
      var last = stack[stack.length - 1];
      if (last == symbol) {
        stack.pop();
      }
      else {
        stack.push(symbol);
      }
    }
    else {
      if (closeBracket) {
        stack.push(symbol);
      }

      if (openBracket) {
        var last = stack.pop();
        if (last != openBracket)
          return false;
      }
    }
  }
  return stack.length == 0;
}
// testBrackets("((()))()", [ [ '(', ')' ] ])
// testBrackets('|(|)',[['(', ')'], ['|', '|']])
