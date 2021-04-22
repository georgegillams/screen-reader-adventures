import ipParse from 'ip-parse';

export function ipPrefix(address) {
  const parsed = ipParse.parseIp(address);
  let delimiter = '.';
  let trimCount = 0;
  if (parsed.length > 0) {
    trimCount = 1;
  }
  if (parsed.length > 1) {
    trimCount = 2;
  }
  if (parsed.length > 4) {
    delimiter = ':';
    trimCount = 4;
  }
  for (let i = 1; i < trimCount + 1; i += 1) {
    parsed[parsed.length - i] = 'X';
  }
  return parsed.join(delimiter);
}
