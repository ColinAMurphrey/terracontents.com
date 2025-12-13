/* Small helper: insert template, preview to iframe, and copy to clipboard */
(function () {
  const insertBtn = document.getElementById('insertTemplateBtn');
  const clearBtn = document.getElementById('clearEditorBtn');
  const previewBtn = document.getElementById('previewBtn');
  const saveBtn = document.getElementById('saveHtmlBtn');
  const textarea = document.getElementById('adventureHtmlInput');
  const iframe = document.getElementById('adventurePreview');

  const sampleTemplate = `<!-- Adventure template -->
<article style="font-family:system-ui,Segoe UI,Roboto,Arial;line-height:1.45;color:#111;">
  <h2>Adventure Title</h2>
  <p><strong>Date:</strong> YYYY-MM-DD</p>
  <p>Write a short summary of the trip here.</p>
  <figure>
    <img src="https://via.placeholder.com/800x320" alt="Adventure photo" style="max-width:100%;height:auto;border-radius:8px;">
    <figcaption style="font-size:.9rem;color:#555;margin-top:.5rem">Caption for the photo</figcaption>
  </figure>
  <h3>Highlights</h3>
  <ul>
    <li>Highlight one</li>
    <li>Highlight two</li>
  </ul>
</article>`;

  function updatePreview() {
    const doc = iframe;
    try {
      doc.srcdoc = textarea.value || '<p style="color:#666">Nothing to preview — write some HTML and click Preview.</p>';
    } catch (e) {
      // fallback for browsers not supporting srcdoc
      const w = iframe.contentWindow;
      w.document.open();
      w.document.write(textarea.value || '<p style="color:#666">Nothing to preview.</p>');
      w.document.close();
    }
  }

  insertBtn.addEventListener('click', () => {
    textarea.value = sampleTemplate;
    textarea.focus();
  });

  clearBtn.addEventListener('click', () => {
    textarea.value = '';
    iframe.srcdoc = '<p style="color:#666">Nothing to preview.</p>';
  });

  previewBtn.addEventListener('click', () => {
    updatePreview();
  });

  // Copy HTML to clipboard (user can paste elsewhere)
  saveBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(textarea.value);
      saveBtn.textContent = 'Copied!';
      setTimeout(()=> saveBtn.textContent = 'Save (copy)', 1400);
    } catch (err) {
      // fallback: select then execCommand
      textarea.select();
      document.execCommand('copy');
      saveBtn.textContent = 'Copied!';
      setTimeout(()=> saveBtn.textContent = 'Save (copy)', 1400);
    }
  });

  // Initialize preview placeholder
  iframe.srcdoc = '<p style="color:#666">Nothing to preview.</p>';
})();