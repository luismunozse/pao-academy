const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
  { width: 192, height: 192, name: 'icon-192.png' },
  { width: 512, height: 512, name: 'icon-512.png' },
  { width: 180, height: 180, name: 'apple-touch-icon.png' },
  { width: 32, height: 32, name: 'favicon-32x32.png' },
  { width: 16, height: 16, name: 'favicon-16x16.png' },
];

async function generateIcons() {
  const svgPath = path.join(__dirname, '..', 'public', 'logo.svg');
  const publicPath = path.join(__dirname, '..', 'public');

  console.log('🎨 Generando iconos PNG desde logo.svg...\n');

  for (const size of sizes) {
    const outputPath = path.join(publicPath, size.name);

    try {
      await sharp(svgPath)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(outputPath);

      console.log(`✅ Creado: ${size.name} (${size.width}x${size.height})`);
    } catch (error) {
      console.error(`❌ Error creando ${size.name}:`, error.message);
    }
  }

  console.log('\n✅ Iconos generados exitosamente!');
}

generateIcons().catch(console.error);
