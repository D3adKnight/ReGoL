import { g as blit } from '../../../common/array-d1f1d88f.js';
import { s as set, g as get$1, a as caml_make_vect } from '../../../common/caml_array-2aef8650.js';
import '../../../common/curry-6b5bcbbf.js';
import '../../../common/caml_obj-c0f11223.js';

var min_int = [
  -2147483648,
  0
];

var max_int$2 = [
  2147483647,
  4294967295
];

var one = [
  0,
  1
];

var zero = [
  0,
  0
];

var neg_one = [
  -1,
  4294967295
];

function neg_signed(x) {
  return (x & -2147483648) !== 0;
}

function non_neg_signed(x) {
  return (x & -2147483648) === 0;
}

function neg(param) {
  var other_lo = (param[1] ^ -1) + 1 | 0;
  return [
          (param[0] ^ -1) + (
            other_lo === 0 ? 1 : 0
          ) | 0,
          (other_lo >>> 0)
        ];
}

function add_aux(param, y_lo, y_hi) {
  var x_lo = param[1];
  var lo = x_lo + y_lo | 0;
  var overflow = neg_signed(x_lo) && (neg_signed(y_lo) || non_neg_signed(lo)) || neg_signed(y_lo) && non_neg_signed(lo) ? 1 : 0;
  return [
          param[0] + y_hi + overflow | 0,
          (lo >>> 0)
        ];
}

function add(self, param) {
  return add_aux(self, param[1], param[0]);
}

function eq(x, y) {
  if (x[0] === y[0]) {
    return x[1] === y[1];
  } else {
    return false;
  }
}

function sub_aux(x, lo, hi) {
  var y_lo = ((lo ^ -1) + 1 >>> 0);
  var y_hi = (hi ^ -1) + (
    y_lo === 0 ? 1 : 0
  ) | 0;
  return add_aux(x, y_lo, y_hi);
}

function sub(self, param) {
  return sub_aux(self, param[1], param[0]);
}

function lsl_(x, numBits) {
  if (numBits === 0) {
    return x;
  }
  var lo = x[1];
  if (numBits >= 32) {
    return [
            (lo << (numBits - 32 | 0)),
            0
          ];
  } else {
    return [
            (lo >>> (32 - numBits | 0)) | (x[0] << numBits),
            ((lo << numBits) >>> 0)
          ];
  }
}

function asr_(x, numBits) {
  if (numBits === 0) {
    return x;
  }
  var hi = x[0];
  if (numBits < 32) {
    return [
            (hi >> numBits),
            (((hi << (32 - numBits | 0)) | (x[1] >>> numBits)) >>> 0)
          ];
  } else {
    return [
            hi >= 0 ? 0 : -1,
            ((hi >> (numBits - 32 | 0)) >>> 0)
          ];
  }
}

function is_zero(param) {
  if (param[0] !== 0) {
    return false;
  } else {
    return param[1] === 0;
  }
}

function mul(_this, _other) {
  while(true) {
    var other = _other;
    var $$this = _this;
    var lo;
    var this_hi = $$this[0];
    var exit = 0;
    var exit$1 = 0;
    var exit$2 = 0;
    if (this_hi !== 0) {
      exit$2 = 4;
    } else {
      if ($$this[1] === 0) {
        return zero;
      }
      exit$2 = 4;
    }
    if (exit$2 === 4) {
      if (other[0] !== 0) {
        exit$1 = 3;
      } else {
        if (other[1] === 0) {
          return zero;
        }
        exit$1 = 3;
      }
    }
    if (exit$1 === 3) {
      if (this_hi !== -2147483648 || $$this[1] !== 0) {
        exit = 2;
      } else {
        lo = other[1];
      }
    }
    if (exit === 2) {
      var other_hi = other[0];
      var lo$1 = $$this[1];
      var exit$3 = 0;
      if (other_hi !== -2147483648 || other[1] !== 0) {
        exit$3 = 3;
      } else {
        lo = lo$1;
      }
      if (exit$3 === 3) {
        var other_lo = other[1];
        if (this_hi < 0) {
          if (other_hi >= 0) {
            return neg(mul(neg($$this), other));
          }
          _other = neg(other);
          _this = neg($$this);
          continue ;
        }
        if (other_hi < 0) {
          return neg(mul($$this, neg(other)));
        }
        var a48 = (this_hi >>> 16);
        var a32 = this_hi & 65535;
        var a16 = (lo$1 >>> 16);
        var a00 = lo$1 & 65535;
        var b48 = (other_hi >>> 16);
        var b32 = other_hi & 65535;
        var b16 = (other_lo >>> 16);
        var b00 = other_lo & 65535;
        var c48 = 0;
        var c32 = 0;
        var c16 = 0;
        var c00 = a00 * b00;
        c16 = (c00 >>> 16) + a16 * b00;
        c32 = (c16 >>> 16);
        c16 = (c16 & 65535) + a00 * b16;
        c32 = c32 + (c16 >>> 16) + a32 * b00;
        c48 = (c32 >>> 16);
        c32 = (c32 & 65535) + a16 * b16;
        c48 = c48 + (c32 >>> 16);
        c32 = (c32 & 65535) + a00 * b32;
        c48 = c48 + (c32 >>> 16);
        c32 = c32 & 65535;
        c48 = c48 + (a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48) & 65535;
        return [
                c32 | (c48 << 16),
                ((c00 & 65535 | ((c16 & 65535) << 16)) >>> 0)
              ];
      }
      
    }
    if ((lo & 1) === 0) {
      return zero;
    } else {
      return min_int;
    }
  }}

function or_(param, param$1) {
  return [
          param[0] | param$1[0],
          ((param[1] | param$1[1]) >>> 0)
        ];
}

function ge(param, param$1) {
  var other_hi = param$1[0];
  var hi = param[0];
  if (hi > other_hi) {
    return true;
  } else if (hi < other_hi) {
    return false;
  } else {
    return param[1] >= param$1[1];
  }
}

function gt(x, y) {
  if (x[0] > y[0]) {
    return true;
  } else if (x[0] < y[0]) {
    return false;
  } else {
    return x[1] > y[1];
  }
}

function le(x, y) {
  return !gt(x, y);
}

function to_float(param) {
  return param[0] * 0x100000000 + param[1];
}

function of_float(x) {
  if (isNaN(x) || !isFinite(x)) {
    return zero;
  }
  if (x <= -9.22337203685477581e+18) {
    return min_int;
  }
  if (x + 1 >= 9.22337203685477581e+18) {
    return max_int$2;
  }
  if (x < 0) {
    return neg(of_float(-x));
  }
  var hi = x / 4294967296 | 0;
  var lo = x % 4294967296 | 0;
  return [
          hi,
          (lo >>> 0)
        ];
}

function div(_self, _other) {
  while(true) {
    var other = _other;
    var self = _self;
    var self_hi = self[0];
    var exit = 0;
    var exit$1 = 0;
    if (other[0] !== 0 || other[1] !== 0) {
      exit$1 = 2;
    } else {
      throw {
            RE_EXN_ID: "Division_by_zero",
            Error: new Error()
          };
    }
    if (exit$1 === 2) {
      if (self_hi !== -2147483648) {
        if (self_hi !== 0) {
          exit = 1;
        } else {
          if (self[1] === 0) {
            return zero;
          }
          exit = 1;
        }
      } else if (self[1] !== 0) {
        exit = 1;
      } else {
        if (eq(other, one) || eq(other, neg_one)) {
          return self;
        }
        if (eq(other, min_int)) {
          return one;
        }
        var half_this = asr_(self, 1);
        var approx = lsl_(div(half_this, other), 1);
        var exit$2 = 0;
        if (approx[0] !== 0) {
          exit$2 = 3;
        } else {
          if (approx[1] === 0) {
            if (other[0] < 0) {
              return one;
            } else {
              return neg(one);
            }
          }
          exit$2 = 3;
        }
        if (exit$2 === 3) {
          var rem = sub(self, mul(other, approx));
          return add(approx, div(rem, other));
        }
        
      }
    }
    if (exit === 1) {
      var other_hi = other[0];
      var exit$3 = 0;
      if (other_hi !== -2147483648) {
        exit$3 = 2;
      } else {
        if (other[1] === 0) {
          return zero;
        }
        exit$3 = 2;
      }
      if (exit$3 === 2) {
        if (self_hi < 0) {
          if (other_hi >= 0) {
            return neg(div(neg(self), other));
          }
          _other = neg(other);
          _self = neg(self);
          continue ;
        }
        if (other_hi < 0) {
          return neg(div(self, neg(other)));
        }
        var res = zero;
        var rem$1 = self;
        while(ge(rem$1, other)) {
          var b = Math.floor(to_float(rem$1) / to_float(other));
          var approx$1 = 1 > b ? 1 : b;
          var log2 = Math.ceil(Math.log(approx$1) / Math.LN2);
          var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
          var approxRes = of_float(approx$1);
          var approxRem = mul(approxRes, other);
          while(approxRem[0] < 0 || gt(approxRem, rem$1)) {
            approx$1 = approx$1 - delta;
            approxRes = of_float(approx$1);
            approxRem = mul(approxRes, other);
          }          if (is_zero(approxRes)) {
            approxRes = one;
          }
          res = add(res, approxRes);
          rem$1 = sub(rem$1, approxRem);
        }        return res;
      }
      
    }
    
  }}

function mod_(self, other) {
  return sub(self, mul(div(self, other), other));
}

function of_int32(lo) {
  return [
          lo < 0 ? -1 : 0,
          (lo >>> 0)
        ];
}
/* No side effect */

function get(s, i) {
  if (i >= s.length || i < 0) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
  }
  return s.charCodeAt(i);
}
/* No side effect */

var max_int$1 = 2147483647;
/* No side effect */

var max_int = max_int$2;
/* No side effect */

function cmn(q, a, b, x, s, t) {
  var a$1 = ((a + q | 0) + x | 0) + t | 0;
  return ((a$1 << s) | (a$1 >>> (32 - s | 0)) | 0) + b | 0;
}

function f(a, b, c, d, x, s, t) {
  return cmn(b & c | (b ^ -1) & d, a, b, x, s, t);
}

function g(a, b, c, d, x, s, t) {
  return cmn(b & d | c & (d ^ -1), a, b, x, s, t);
}

function h(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function i(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | d ^ -1), a, b, x, s, t);
}

function cycle(x, k) {
  var a = x[0];
  var b = x[1];
  var c = x[2];
  var d = x[3];
  a = f(a, b, c, d, k[0], 7, -680876936);
  d = f(d, a, b, c, k[1], 12, -389564586);
  c = f(c, d, a, b, k[2], 17, 606105819);
  b = f(b, c, d, a, k[3], 22, -1044525330);
  a = f(a, b, c, d, k[4], 7, -176418897);
  d = f(d, a, b, c, k[5], 12, 1200080426);
  c = f(c, d, a, b, k[6], 17, -1473231341);
  b = f(b, c, d, a, k[7], 22, -45705983);
  a = f(a, b, c, d, k[8], 7, 1770035416);
  d = f(d, a, b, c, k[9], 12, -1958414417);
  c = f(c, d, a, b, k[10], 17, -42063);
  b = f(b, c, d, a, k[11], 22, -1990404162);
  a = f(a, b, c, d, k[12], 7, 1804603682);
  d = f(d, a, b, c, k[13], 12, -40341101);
  c = f(c, d, a, b, k[14], 17, -1502002290);
  b = f(b, c, d, a, k[15], 22, 1236535329);
  a = g(a, b, c, d, k[1], 5, -165796510);
  d = g(d, a, b, c, k[6], 9, -1069501632);
  c = g(c, d, a, b, k[11], 14, 643717713);
  b = g(b, c, d, a, k[0], 20, -373897302);
  a = g(a, b, c, d, k[5], 5, -701558691);
  d = g(d, a, b, c, k[10], 9, 38016083);
  c = g(c, d, a, b, k[15], 14, -660478335);
  b = g(b, c, d, a, k[4], 20, -405537848);
  a = g(a, b, c, d, k[9], 5, 568446438);
  d = g(d, a, b, c, k[14], 9, -1019803690);
  c = g(c, d, a, b, k[3], 14, -187363961);
  b = g(b, c, d, a, k[8], 20, 1163531501);
  a = g(a, b, c, d, k[13], 5, -1444681467);
  d = g(d, a, b, c, k[2], 9, -51403784);
  c = g(c, d, a, b, k[7], 14, 1735328473);
  b = g(b, c, d, a, k[12], 20, -1926607734);
  a = h(a, b, c, d, k[5], 4, -378558);
  d = h(d, a, b, c, k[8], 11, -2022574463);
  c = h(c, d, a, b, k[11], 16, 1839030562);
  b = h(b, c, d, a, k[14], 23, -35309556);
  a = h(a, b, c, d, k[1], 4, -1530992060);
  d = h(d, a, b, c, k[4], 11, 1272893353);
  c = h(c, d, a, b, k[7], 16, -155497632);
  b = h(b, c, d, a, k[10], 23, -1094730640);
  a = h(a, b, c, d, k[13], 4, 681279174);
  d = h(d, a, b, c, k[0], 11, -358537222);
  c = h(c, d, a, b, k[3], 16, -722521979);
  b = h(b, c, d, a, k[6], 23, 76029189);
  a = h(a, b, c, d, k[9], 4, -640364487);
  d = h(d, a, b, c, k[12], 11, -421815835);
  c = h(c, d, a, b, k[15], 16, 530742520);
  b = h(b, c, d, a, k[2], 23, -995338651);
  a = i(a, b, c, d, k[0], 6, -198630844);
  d = i(d, a, b, c, k[7], 10, 1126891415);
  c = i(c, d, a, b, k[14], 15, -1416354905);
  b = i(b, c, d, a, k[5], 21, -57434055);
  a = i(a, b, c, d, k[12], 6, 1700485571);
  d = i(d, a, b, c, k[3], 10, -1894986606);
  c = i(c, d, a, b, k[10], 15, -1051523);
  b = i(b, c, d, a, k[1], 21, -2054922799);
  a = i(a, b, c, d, k[8], 6, 1873313359);
  d = i(d, a, b, c, k[15], 10, -30611744);
  c = i(c, d, a, b, k[6], 15, -1560198380);
  b = i(b, c, d, a, k[13], 21, 1309151649);
  a = i(a, b, c, d, k[4], 6, -145523070);
  d = i(d, a, b, c, k[11], 10, -1120210379);
  c = i(c, d, a, b, k[2], 15, 718787259);
  b = i(b, c, d, a, k[9], 21, -343485551);
  x[0] = a + x[0] | 0;
  x[1] = b + x[1] | 0;
  x[2] = c + x[2] | 0;
  x[3] = d + x[3] | 0;
  
}

var state = [
  1732584193,
  -271733879,
  -1732584194,
  271733878
];

var md5blk = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
];

function caml_md5_string(s, start, len) {
  var s$1 = s.slice(start, len);
  var n = s$1.length;
  state[0] = 1732584193;
  state[1] = -271733879;
  state[2] = -1732584194;
  state[3] = 271733878;
  for(var i = 0; i <= 15; ++i){
    md5blk[i] = 0;
  }
  var i_end = n / 64 | 0;
  for(var i$1 = 1; i$1 <= i_end; ++i$1){
    for(var j = 0; j <= 15; ++j){
      var k = ((i$1 << 6) - 64 | 0) + (j << 2) | 0;
      md5blk[j] = ((s$1.charCodeAt(k) + (s$1.charCodeAt(k + 1 | 0) << 8) | 0) + (s$1.charCodeAt(k + 2 | 0) << 16) | 0) + (s$1.charCodeAt(k + 3 | 0) << 24) | 0;
    }
    cycle(state, md5blk);
  }
  var s_tail = s$1.slice((i_end << 6));
  for(var kk = 0; kk <= 15; ++kk){
    md5blk[kk] = 0;
  }
  var i_end$1 = s_tail.length - 1 | 0;
  for(var i$2 = 0; i$2 <= i_end$1; ++i$2){
    md5blk[i$2 / 4 | 0] = md5blk[i$2 / 4 | 0] | (s_tail.charCodeAt(i$2) << (i$2 % 4 << 3));
  }
  var i$3 = i_end$1 + 1 | 0;
  md5blk[i$3 / 4 | 0] = md5blk[i$3 / 4 | 0] | (128 << (i$3 % 4 << 3));
  if (i$3 > 55) {
    cycle(state, md5blk);
    for(var i$4 = 0; i$4 <= 15; ++i$4){
      md5blk[i$4] = 0;
    }
  }
  md5blk[14] = (n << 3);
  cycle(state, md5blk);
  return String.fromCharCode(state[0] & 255, (state[0] >> 8) & 255, (state[0] >> 16) & 255, (state[0] >> 24) & 255, state[1] & 255, (state[1] >> 8) & 255, (state[1] >> 16) & 255, (state[1] >> 24) & 255, state[2] & 255, (state[2] >> 8) & 255, (state[2] >> 16) & 255, (state[2] >> 24) & 255, state[3] & 255, (state[3] >> 8) & 255, (state[3] >> 16) & 255, (state[3] >> 24) & 255);
}
/* No side effect */

function string(str) {
  return caml_md5_string(str, 0, str.length);
}
/* No side effect */

function random_seed(param) {
  return [(Math.floor(Math.random()*0x7fffffff))];
}

function assign(st1, st2) {
  blit(st2.st, 0, st1.st, 0, 55);
  st1.idx = st2.idx;
  
}

function full_init(s, seed) {
  var combine = function (accu, x) {
    return string(accu + String(x));
  };
  var extract = function (d) {
    return ((get(d, 0) + (get(d, 1) << 8) | 0) + (get(d, 2) << 16) | 0) + (get(d, 3) << 24) | 0;
  };
  var seed$1 = seed.length === 0 ? [0] : seed;
  var l = seed$1.length;
  for(var i = 0; i <= 54; ++i){
    set(s.st, i, i);
  }
  var accu = "x";
  for(var i$1 = 0 ,i_finish = 54 + (
      55 > l ? 55 : l
    ) | 0; i$1 <= i_finish; ++i$1){
    var j = i$1 % 55;
    var k = i$1 % l;
    accu = combine(accu, get$1(seed$1, k));
    set(s.st, j, (get$1(s.st, j) ^ extract(accu)) & 1073741823);
  }
  s.idx = 0;
  
}

function make(seed) {
  var result = {
    st: caml_make_vect(55, 0),
    idx: 0
  };
  full_init(result, seed);
  return result;
}

function make_self_init(param) {
  return make(random_seed());
}

function copy(s) {
  var result = {
    st: caml_make_vect(55, 0),
    idx: 0
  };
  assign(result, s);
  return result;
}

function bits(s) {
  s.idx = (s.idx + 1 | 0) % 55;
  var curval = get$1(s.st, s.idx);
  var newval = get$1(s.st, (s.idx + 24 | 0) % 55) + (curval ^ (curval >>> 25) & 31) | 0;
  var newval30 = newval & 1073741823;
  set(s.st, s.idx, newval30);
  return newval30;
}

function $$int(s, bound) {
  if (bound > 1073741823 || bound <= 0) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Random.int",
          Error: new Error()
        };
  }
  while(true) {
    var r = bits(s);
    var v = r % bound;
    if ((r - v | 0) <= ((1073741823 - bound | 0) + 1 | 0)) {
      return v;
    }
    continue ;
  }}

function int32(s, bound) {
  if (bound <= 0) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Random.int32",
          Error: new Error()
        };
  }
  while(true) {
    var b1 = bits(s);
    var b2 = ((bits(s) & 1) << 30);
    var r = b1 | b2;
    var v = r % bound;
    if ((r - v | 0) <= ((max_int$1 - bound | 0) + 1 | 0)) {
      return v;
    }
    continue ;
  }}

function int64(s, bound) {
  if (le(bound, zero)) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Random.int64",
          Error: new Error()
        };
  }
  while(true) {
    var b1 = of_int32(bits(s));
    var b2 = lsl_(of_int32(bits(s)), 30);
    var b3 = lsl_(of_int32(bits(s) & 7), 60);
    var r = or_(b1, or_(b2, b3));
    var v = mod_(r, bound);
    if (!gt(sub(r, v), add(sub(max_int, bound), one))) {
      return v;
    }
    continue ;
  }}

function rawfloat(s) {
  var r1 = bits(s);
  var r2 = bits(s);
  return (r1 / 1073741824.0 + r2) / 1073741824.0;
}

function $$float(s, bound) {
  return rawfloat(s) * bound;
}

function bool(s) {
  return (bits(s) & 1) === 0;
}

var $$default = {
  st: [
    987910699,
    495797812,
    364182224,
    414272206,
    318284740,
    990407751,
    383018966,
    270373319,
    840823159,
    24560019,
    536292337,
    512266505,
    189156120,
    730249596,
    143776328,
    51606627,
    140166561,
    366354223,
    1003410265,
    700563762,
    981890670,
    913149062,
    526082594,
    1021425055,
    784300257,
    667753350,
    630144451,
    949649812,
    48546892,
    415514493,
    258888527,
    511570777,
    89983870,
    283659902,
    308386020,
    242688715,
    482270760,
    865188196,
    1027664170,
    207196989,
    193777847,
    619708188,
    671350186,
    149669678,
    257044018,
    87658204,
    558145612,
    183450813,
    28133145,
    901332182,
    710253903,
    510646120,
    652377910,
    409934019,
    801085050
  ],
  idx: 0
};

function bits$1(param) {
  return bits($$default);
}

function $$int$1(bound) {
  return $$int($$default, bound);
}

function int32$1(bound) {
  return int32($$default, bound);
}

function int64$1(bound) {
  return int64($$default, bound);
}

function $$float$1(scale) {
  return rawfloat($$default) * scale;
}

function bool$1(param) {
  return bool($$default);
}

function full_init$1(seed) {
  return full_init($$default, seed);
}

function init(seed) {
  return full_init($$default, [seed]);
}

function self_init(param) {
  return full_init$1(random_seed());
}

function get_state(param) {
  return copy($$default);
}

function set_state(s) {
  return assign($$default, s);
}

var State = {
  make: make,
  make_self_init: make_self_init,
  copy: copy,
  bits: bits,
  $$int: $$int,
  int32: int32,
  int64: int64,
  $$float: $$float,
  bool: bool
};
/* No side effect */

export { $$float$1 as $$float, $$int$1 as $$int, State, bits$1 as bits, bool$1 as bool, full_init$1 as full_init, get_state, init, int32$1 as int32, int64$1 as int64, self_init, set_state };
