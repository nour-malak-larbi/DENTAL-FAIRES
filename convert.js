const fs = require('fs');

const htmlContent = fs.readFileSync('dental_fairies_v2.html', 'utf-8');

// 1. Extract CSS
const styleMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
    let css = styleMatch[1];
    // Next.js needs standard CSS, but we also want Tailwind utilities if needed, 
    // though the user's design uses pure CSS. Let's just write it.
    
    // We should keep the Tailwind imports if they were there, but this is a pure CSS design.
    fs.writeFileSync('src/app/globals.css', css, 'utf-8');
    console.log('CSS extracted and written to globals.css');
}

// 2. Extract Body Content
let bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/);
if (bodyMatch) {
    let bodyHtml = bodyMatch[1];
    
    // Convert to JSX
    // Replace class= with className=
    let jsx = bodyHtml.replace(/class=/g, 'className=');
    
    // Replace inline styles: style="color:red; background:url(...);" -> style={{color: 'red', background: 'url(...)'}}
    // Actually, inline styles in this specific file are very minimal or absent. Let's do a basic conversion or handle it manually if it fails.
    // Let's use a regex to catch style="prop: value;"
    jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
        const rules = p1.split(';').filter(Boolean);
        const styleObj = {};
        rules.forEach(rule => {
            let [key, ...val] = rule.split(':');
            if (key && val) {
                key = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
                styleObj[key] = val.join(':').trim();
            }
        });
        return `style={${JSON.stringify(styleObj)}}`;
    });
    
    // Fix SVG properties (stroke-linecap -> strokeLinecap, etc)
    const svgProps = ['stroke-linecap', 'stroke-linejoin', 'stroke-width', 'stroke-dasharray', 'stroke-dashoffset', 'fill-opacity', 'stop-color', 'stop-opacity', 'clip-path'];
    svgProps.forEach(prop => {
        const camelCase = prop.replace(/-([a-z])/g, g => g[1].toUpperCase());
        const regex = new RegExp(prop + '=', 'g');
        jsx = jsx.replace(regex, camelCase + '=');
    });
    
    // Self-closing tags (img, input, br, hr)
    jsx = jsx.replace(/<img([^>]*)>/g, (m, p1) => {
        if (p1.endsWith('/')) return m;
        return `<img${p1} />`;
    });
    jsx = jsx.replace(/<br([^>]*)>/g, (m, p1) => {
        if (p1.endsWith('/')) return m;
        return `<br${p1} />`;
    });
    jsx = jsx.replace(/<hr([^>]*)>/g, (m, p1) => {
        if (p1.endsWith('/')) return m;
        return `<hr${p1} />`;
    });

    // Handle HTML comments
    jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

    // Remove any remaining <script> tags and put their content into a useEffect if needed
    // Wait, the animation might use JS.
    const scriptMatch = jsx.match(/<script>([\s\S]*?)<\/script>/);
    let scriptContent = '';
    if (scriptMatch) {
        scriptContent = scriptMatch[1];
        jsx = jsx.replace(/<script>([\s\S]*?)<\/script>/, '');
    }

    const pageContent = `
'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    ${scriptContent}
  }, []);

  return (
    <main className="relative min-h-screen">
      ${jsx}
    </main>
  );
}
`;

    fs.writeFileSync('src/app/page.tsx', pageContent, 'utf-8');
    console.log('JSX extracted and written to page.tsx');
}
