const slice = Array.prototype.slice;

export function ordinal(range) {
	let map = {};
	let domain = [];
	range = range === undefined ? [] : slice.call(range);

	function scale(d) {
    let key = d + "";
    let i = map[key];
    if (!i) {
      map[key] = (i = domain.push(d));
    }
    return range[(i - 1) % range.length];
  }

  scale.domain = function(_) {
    return scale;
  }

  scale.range = function(_) {
    return arguments.length ? (range = slice.call(_), scale) : range.slice();
  }

  scale.copy = function() {
    return ordinal().range(range);
  }

  return scale;
}