export function blobToFile(blob, filename) {
  const $a = document.createElement('a');
  document.body.appendChild($a);
  $a.style.display = 'none';
  const url = URL.createObjectURL(blob);
  $a.href = url;
  $a.download = filename;
  $a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild($a);
}
