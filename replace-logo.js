const fs = require('fs');

const pagePath = 'src/app/page.tsx';
let content = fs.readFileSync(pagePath, 'utf-8');

// Replace any img src that starts with data:image/png;base64 within nav-logo and footer-logo
content = content.replace(/<img\s+src="data:image\/png;base64[^"]*"/g, '<img src="/logo-transparent.png"');

fs.writeFileSync(pagePath, content, 'utf-8');
console.log('Logos replaced successfully.');
