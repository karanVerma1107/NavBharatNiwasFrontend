export const addAlignmentToParagraphs = (html) => {
  if (!html) return '';

  // Create a temporary DOM container to manipulate HTML
  const container = document.createElement('div');
  container.innerHTML = html;

  const paragraphs = container.querySelectorAll('p');

  paragraphs.forEach((p) => {
    p.style.textAlign = 'justify'; // or 'left', 'center', 'right'
  });

  return container.innerHTML;
};
