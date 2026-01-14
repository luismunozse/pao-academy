# 📊 Configuración de Google Search Console

## Paso 1: Crear Cuenta y Agregar Propiedad

1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en "Agregar propiedad"
4. Selecciona el tipo:
   - **Dominio** (recomendado): Verifica todo el dominio (glomind360.com, www.glomind360.com, etc.)
   - **Prefijo de URL**: Solo verifica una URL específica

## Paso 2: Verificar Propiedad

### Opción A: Verificación con Etiqueta HTML (YA CONFIGURADA ✅)

1. Selecciona "Etiqueta HTML" como método de verificación
2. Copia el código que aparece así: `<meta name="google-site-verification" content="CODIGO_AQUI" />`
3. Copia solo el contenido del atributo `content` (ejemplo: `abc123def456ghi789`)
4. Crea un archivo `.env.local` en la raíz del proyecto (si no existe)
5. Agrega esta línea:
   ```
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123def456ghi789
   ```
6. Guarda el archivo
7. Reinicia el servidor de desarrollo: `npm run dev`
8. Vuelve a Google Search Console y haz clic en "Verificar"

### Opción B: Verificación con archivo HTML

Si prefieres usar un archivo HTML:

1. Descarga el archivo de verificación que Google te proporciona
2. Colócalo en la carpeta `public/` del proyecto
3. Accede a `https://tu-dominio.com/google[codigo].html` para verificar
4. Haz clic en "Verificar" en Google Search Console

## Paso 3: Enviar Sitemap

Una vez verificado:

1. Ve a "Sitemaps" en el menú lateral
2. Agrega la URL del sitemap: `https://tu-dominio.com/sitemap.xml`
3. Haz clic en "Enviar"
4. Espera unos días para que Google indexe tu sitio

## Paso 4: Monitorear Rendimiento

Después de algunos días, podrás ver:
- 📊 Impresiones y clics en búsquedas
- 🔍 Consultas de búsqueda
- 📱 Rendimiento en móvil vs. desktop
- ⚠️ Errores de indexación
- 🚀 Core Web Vitals

## Paso 5: Optimizaciones Post-Verificación

### Solicitar Indexación Manual
Para páginas nuevas o actualizadas:
1. Ve a "Inspección de URLs"
2. Ingresa la URL completa
3. Si no está indexada, haz clic en "Solicitar indexación"

### Revisar Core Web Vitals
1. Ve a "Experiencia" > "Core Web Vitals"
2. Identifica URLs con problemas
3. Optimiza las páginas con peor rendimiento

### Configurar Datos Estructurados
Ya implementados en el proyecto:
- ✅ Schema.org Organization
- ✅ Schema.org WebSite con SearchAction
- ✅ Schema.org Course (en páginas de cursos)

Verifica en: https://search.google.com/test/rich-results

## Troubleshooting

### "La etiqueta no se encontró"
- Asegúrate de que el servidor esté corriendo
- Verifica que el archivo `.env.local` existe
- Reinicia el servidor después de agregar la variable
- Limpia la caché del navegador

### "El sitemap no se puede leer"
- Verifica que `https://tu-dominio.com/sitemap.xml` sea accesible
- El sitemap se genera dinámicamente en `app/sitemap.ts`

### "Problemas de indexación"
- Verifica `robots.txt` en `https://tu-dominio.com/robots.txt`
- Asegúrate de que no hay `noindex` en las páginas importantes

## URLs Importantes

- Google Search Console: https://search.google.com/search-console
- Rich Results Test: https://search.google.com/test/rich-results
- PageSpeed Insights: https://pagespeed.web.dev/
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly

## Próximos Pasos

Una vez verificado y con datos:
1. 📈 Analizar términos de búsqueda principales
2. 🎯 Optimizar contenido para palabras clave con alto CTR
3. 📝 Crear contenido para términos con alta impresión pero bajo CTR
4. 🔗 Monitorear backlinks en "Enlaces"
5. 🚨 Configurar alertas de email para problemas críticos
