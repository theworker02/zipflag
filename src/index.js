
function readInput(fallback) {
  if (fallback != null && String(fallback).length) return String(fallback);
  if (process.stdin && process.stdin.isTTY) return "";
  try {
    const fs = require("fs");
    if (typeof fs.readFileSync === "function") {
      // Non-blocking when no piped data: use readFileSync only if fd 0 has size or isn't a TTY.
      return fs.readFileSync(0, "utf8");
    }
  } catch (_) {}
  return "";
}

function stats(nums) {
  const xs = nums.filter(n => Number.isFinite(n)).sort((a, b) => a - b);
  if (!xs.length) return { count: 0 };
  const sum = xs.reduce((a, b) => a + b, 0);
  const mid = xs.length % 2 ? xs[(xs.length - 1) / 2] : (xs[xs.length / 2 - 1] + xs[xs.length / 2]) / 2;
  return { count: xs.length, min: xs[0], max: xs[xs.length - 1], mean: sum / xs.length, median: mid, sum };
}
function run(argv) {
  const nums = (argv.join(" ") || "1 2 3 4 5").trim().split(/\s+/).map(Number);
  return JSON.stringify(stats(nums), null, 2);
}

module.exports = { readInput, stats, run };
