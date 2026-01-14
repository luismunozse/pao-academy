const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToOptimize = [
  {
    input: 'public/hero.jpg',
    outputs: [
      { file: 'public/hero.webp', format: 'webp', quality: 85 },
      { file: 'public/hero-mobile.webp', format: 'webp', quality: 80, width: 768 },
      { file: 'public/hero.jpg', format: 'jpeg', quality: 85 }, // Fallback optimizado
    ]
  }
];

async function optimizeImages() {
  console.log('🖼️  Optimizando imágenes...\n');

  for (const image of imagesToOptimize) {
    const inputPath = path.join(__dirname, '..', image.input);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Imagen no encontrada: ${image.input}`);
      continue;
    }

    const originalSize = fs.statSync(inputPath).size;
    console.log(`📁 Procesando: ${image.input} (${(originalSize / 1024).toFixed(2)} KB)`);

    for (const output of image.outputs) {
      const outputPath = path.join(__dirname, '..', output.file);

      try {
        let processor = sharp(inputPath);

        // Resize si se especifica
        if (output.width) {
          processor = processor.resize(output.width, null, {
            fit: 'inside',
            withoutEnlargement: true
          });
        }

        // Convertir al formato especificado
        if (output.format === 'webp') {
          processor = processor.webp({ quality: output.quality });
        } else if (output.format === 'jpeg') {
          processor = processor.jpeg({ quality: output.quality, progressive: true });
        }

        await processor.toFile(outputPath);

        const newSize = fs.statSync(outputPath).size;
        const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

        console.log(`  ✅ ${output.file} (${(newSize / 1024).toFixed(2)} KB, ${savings}% reducción)`);
      } catch (error) {
        console.error(`  ❌ Error procesando ${output.file}:`, error.message);
      }
    }
    console.log('');
  }

  console.log('✅ Optimización completada!\n');
  console.log('📝 Próximos pasos:');
  console.log('1. Verifica las imágenes en la carpeta public/');
  console.log('2. El componente HeroFixed ya está configurado para usar WebP con fallback');
  console.log('3. Ejecuta npm run build para verificar que todo funciona correctamente');
}

// Verificar si sharp está instalado
try {
  require.resolve('sharp');
  optimizeImages().catch(console.error);
} catch (e) {
  console.log('❌ Sharp no está instalado.\n');
  console.log('Para optimizar las imágenes, ejecuta:');
  console.log('  npm install --save-dev sharp');
  console.log('  node scripts/optimize-images.js\n');
  console.log('O usa una herramienta online:');
  console.log('  https://squoosh.app/ - Convierte hero.jpg a WebP con calidad 85%');
  console.log('  Guarda como hero.webp en la carpeta public/');
}
