const downloadFile = file => {
  const link = document.createElement('a');
  link.setAttribute('href', window.URL.createObjectURL(file));
  link.setAttribute('download', file.name);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  return Promise.resolve(file.name);
};

const downloadStringAsCsv = (fileName, data) => {
  downloadFile(
    new File([data], fileName, {
      type: 'text/csv',
      lastModified: new Date(),
    }),
  );
};

export { downloadFile, downloadStringAsCsv };
export default { downloadFile, downloadStringAsCsv };
