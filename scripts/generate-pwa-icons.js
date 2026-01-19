// Script simples para criar ícones placeholder PWA
// Execute: node scripts/generate-pwa-icons.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');

// SVG template para ícones
const createIconSVG = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#570df8" rx="${size * 0.15}"/>
  <g transform="translate(${size/2}, ${size/2})">
    <!-- Haltere -->
    <circle cx="${-size*0.25}" cy="0" r="${size*0.08}" fill="#fff"/>
    <circle cx="${size*0.25}" cy="0" r="${size*0.08}" fill="#fff"/>
    <rect x="${-size*0.25}" y="${-size*0.02}" width="${size*0.5}" height="${size*0.04}" fill="#fff" rx="${size*0.01}"/>
    
    <!-- Texto -->
    <text 
      x="0" 
      y="${size*0.25}" 
      font-family="Arial, sans-serif" 
      font-size="${size*0.15}" 
      font-weight="bold" 
      fill="#fff" 
      text-anchor="middle">GYM</text>
  </g>
</svg>`.trim();

// Criar SVG temporário para conversão manual
const sizes = [
  { name: 'pwa-64x64.png', size: 64 },
  { name: 'pwa-192x192.png', size: 192 },
  { name: 'pwa-512x512.png', size: 512 },
  { name: 'maskable-icon-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 }
];

console.log('📱 Gerando templates SVG para ícones PWA...\n');

sizes.forEach(({ name, size }) => {
  const svgName = name.replace('.png', '.svg');
  const svgPath = path.join(publicDir, svgName);
  const svgContent = createIconSVG(size);
  
  fs.writeFileSync(svgPath, svgContent);
  console.log(`✅ Criado: ${svgName}`);
});

console.log('\n⚠️  PRÓXIMOS PASSOS:');
console.log('1. Os arquivos SVG foram criados em /public');
console.log('2. Converta os SVG para PNG usando:');
console.log('   - Ferramenta online: https://www.pwabuilder.com/imageGenerator');
console.log('   - Ou localmente com sharp/imagemagick');
console.log('3. Para ícone maskable, use: https://maskable.app/');
console.log('\n💡 Ou use ferramentas online para gerar todos de uma vez!');
