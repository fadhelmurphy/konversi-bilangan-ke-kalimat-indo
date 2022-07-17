const numToWords = (n) => {
    const arr = (x) => Array.from(x);
    const num = (x) => Number(x) || 0;
    const isEmpty = (xs) => xs.length === 0;
    const take = (n) => (xs) => xs.slice(0, n);
    const drop = (n) => (xs) => xs.slice(n);
    const reverse = (xs) => xs.reverse();
    const comp = (f) => (g) => (x) => f(g(x));
    const not = (x) => !x;
    const chunk = (n) => (xs) =>
      isEmpty(xs) ? [] : [take(n)(xs), ...chunk(n)(drop(n)(xs))];
  
    // list angka satuan hingga belasan
    let a = [
      "",
      "satu",
      "dua",
      "tiga",
      "empat",
      "lima",
      "enam",
      "tujuh",
      "delapan",
      "sembilan",
      "sepuluh",
      "sebelas",
      "dua belas",
      "tiga belas",
      "empat belas",
      "lima belas",
      "enam belas",
      "tujuh belas",
      "delapan belas",
      "sembilan belas",
    ];
  
    // list angka 20an hingga 90
    let b = [
      "",
      "",
      "dua puluh",
      "tiga puluh",
      "empat puluh",
      "lima puluh",
      "enam puluh",
      "tujuh puluh",
      "delapan puluh",
      "sembilan puluh",
    ];
  
    // list ribuan, jutaan, milyaran, triliuan, dll
    let g = [
      "",
      "ribu",
      "juta",
      "milyar",
      "triliun",
      "quadriliun",
      "quintiliun",
      "sextiliun",
      "septiliun",
      "octiliun",
      "noniliun",
    ];
  
    // this part is really nasty still
    // it might edit this again later to show how Monoids could fix this up
    let makeGroup = ([ones, tens, huns]) => {
      return [
        num(huns) === 0 ? "" : (huns === "1" ? "seratus " : a[huns] + " ratus "),
        num(ones) === 0 ? b[tens] : (b[tens] && b[tens] + " ") || "",
        a[tens + ones] || a[ones],
      ].join("");
    };
  
    let thousand = (group, i) => (group === "" ? group : `${group} ${g[i]}`);
  
    if (typeof n === "number") return numToWords(String(n));
    else if (n === "0") return "zero";
    else
      return comp(chunk(3))(reverse)(arr(n))
        .map(makeGroup)
        .map(thousand)
        .filter(comp(not)(isEmpty))
        .reverse()
        .join(" ").trim();
  };
  
  module.exports = numToWords