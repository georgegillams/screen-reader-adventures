export default function ghOrgData() {
  return new Promise(resolve => {
    resolve({
      message: 'Getting data from GitHub',
      time: Date.now(),
    });
  });
}
