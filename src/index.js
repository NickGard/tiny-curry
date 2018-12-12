Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.curry = curry;

function curry(fn, arity) {
  var iterations = +arity === arity && arity >= 1 ? arity : fn.length;
  var args = [];

  function intermediate(arg) {
    args.push(arg);
    return args.length >= iterations ? intermediate.value() : intermediate;
  }
  intermediate.value = function() {
    return fn.apply(this, args);
  }.bind(this);

  return intermediate;
}
