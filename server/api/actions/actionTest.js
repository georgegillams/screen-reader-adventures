export default function load(req) {
  return new Promise((resolve, reject) => {
    resolve({ testValue: '31' });
  });
}
