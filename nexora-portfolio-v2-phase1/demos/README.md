# demos/

Drop any working HTML file directly in this folder — no per-file
metadata required. Then open `tools/import.html` in a browser, point
it at this folder, and save the generated catalog it produces into
`data/demos-index.json`. Every file here becomes a real, browsable
entry (title generated from the file's `<title>` tag or its
filename, slug generated from the filename) automatically picked up
everywhere the platform's other content is: the catalog grid,
statistics, filters, and collections — with zero hand-written JSON
per file and no changes to any existing page or component.

Nothing in this folder is touched or modified by the import — files
are only read, never written.
