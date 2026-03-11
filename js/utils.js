export async function loadHTML(selector, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.querySelector(selector).innerHTML = html;
}