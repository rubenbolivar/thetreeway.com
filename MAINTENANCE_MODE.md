# Modo Mantenimiento - TheTreeWay Website

## 📋 Resumen
Este documento explica cómo activar/desactivar el modo mantenimiento del sitio web sin perder el contenido original.

## 🔧 Implementación

### Archivos Creados:
1. `src/components/ParticleBackground.tsx` - Animación de partículas
2. `src/components/MaintenancePage.tsx` - Página de mantenimiento completa
3. `public/images/tree-logo.png` - Logo real de la marca (5000x5000px)
4. Este archivo de documentación

### Archivos Modificados:
1. `next.config.ts` - Agregada variable MAINTENANCE_MODE
2. `src/app/es/page.tsx` - Lógica condicional agregada
3. `src/app/en/page.tsx` - Lógica condicional agregada

## 🚀 Cómo Activar Modo Mantenimiento

1. Abrir `next.config.ts`
2. Cambiar `MAINTENANCE_MODE: 'false'` a `MAINTENANCE_MODE: 'true'`
3. Hacer rebuild: `npm run build`
4. El sitio mostrará la página de mantenimiento

## 🔄 Cómo Revertir al Sitio Original

1. Abrir `next.config.ts`
2. Cambiar `MAINTENANCE_MODE: 'true'` a `MAINTENANCE_MODE: 'false'`
3. Hacer rebuild: `npm run build`
4. Subir archivos al servidor (ver sección Deployment)
5. El sitio mostrará el contenido original completo

## 🚀 Deployment al Servidor

### Comandos para subir cambios:
```bash
# 1. Construir proyecto
npm run build

# 2. Subir archivos al servidor (desde directorio del proyecto)
sshpass -p 'PASSWORD' scp -o StrictHostKeyChecking=no -r out/* root@66.29.133.107:/var/www/thetreeway.com/

# 3. Verificar que se subieron correctamente
sshpass -p 'PASSWORD' ssh -o StrictHostKeyChecking=no root@66.29.133.107 "ls -la /var/www/thetreeway.com/"
```

### Configuración del servidor:
- **IP:** 66.29.133.107
- **Usuario:** root
- **Puerto:** 22
- **Directorio web:** `/var/www/thetreeway.com/`
- **Otros sitios:** No tocar otros directorios en `/var/www/`

## 📁 Estructura de Código

Las páginas principales (`src/app/es/page.tsx` y `src/app/en/page.tsx`) contienen:

```tsx
// Todo el contenido original se mantiene intacto
// Solo se agrega al inicio:

const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';

if (isMaintenanceMode) {
  return <MaintenancePage />;
}

// El resto del código original continúa sin cambios
```

## ⚠️ Importante

- **NUNCA eliminar** el contenido original de las páginas
- **SIEMPRE** hacer backup antes de cambios mayores
- La página de mantenimiento incluye el botón WhatsApp original
- Todas las animaciones y estilos están autocontenidos

## 🎨 Logo Implementado

✅ **Logo real ya implementado:**
- Archivo: `/public/images/tree-logo.png` (5000x5000px PNG)
- Componente: `MaintenancePage.tsx` usa el logo real automáticamente
- Fallback: Placeholder azul si el logo no carga
- Tamaño en pantalla: 256x256px (responsive)

### Código actual del logo:
```tsx
<Image 
  src="/images/tree-logo.png" 
  alt="Tree Logo" 
  width={256}
  height={256}
  className="object-contain drop-shadow-2xl"
  onError={() => {
    // Si el logo no se carga, el CSS mostrará automáticamente el fallback
  }}
/>
// Fallback placeholder automático si el logo falla
<div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl flex items-center justify-center shadow-2xl">
  <span className="text-white text-6xl md:text-8xl font-bold italic">Tree</span>
</div>
```

### Para cambiar el logo:
1. Reemplazar `/public/images/tree-logo.png` con tu nuevo logo
2. Hacer `npm run build`
3. Subir archivos al servidor

## 📞 Contacto

El botón de WhatsApp mantiene el número original: `+584121010744`

## 🛡️ Seguridad y Backups

### Backups Realizados:
- ✅ **Backup completo VPS:** `/root/backups/20250720_131056/www_backup/`
- ✅ **Backup específico thetreeway:** `/root/backups/thetreeway_backup_20250720_131128.tar.gz`
- ✅ **Backup index original:** `/var/www/thetreeway.com/index.html.backup`

### Otros sitios protegidos:
- ✅ `admin.rogers-green.us` - No afectado
- ✅ `queenr.net` - No afectado  
- ✅ `rogers-green.us` - No afectado

### Para restaurar backups:
```bash
# Restaurar desde backup completo
cd /var/www
rm -rf thetreeway.com
cp -R /root/backups/20250720_131056/www_backup/thetreeway.com .

# O restaurar desde archivo comprimido
cd /var/www
rm -rf thetreeway.com
tar -xzf /root/backups/thetreeway_backup_20250720_131128.tar.gz
```

---

## 📝 Estado Actual:
- ✅ MAINTENANCE_MODE='true' (Modo mantenimiento ACTIVO)
- ✅ Contenido original preservado pero oculto
- ✅ Build exitoso sin errores
- ✅ Ambas páginas (ES/EN) implementadas
- ✅ Animación de partículas funcionando
- ✅ Botón WhatsApp operativo
- ✅ **Logo real implementado y funcionando**
- ✅ **Desplegado en producción (thetreeway.com)**
- ✅ **Backup completo del VPS realizado**

## 🔄 Historial de Cambios

**2025-01-20 - v1.1:**
- ✅ Logo real implementado (`tree-logo.png` 5000x5000px)
- ✅ Componente MaintenancePage actualizado con manejo de errores
- ✅ Fallback automático al placeholder si logo falla
- ✅ Desplegado en producción
- ✅ Backup completo del VPS

**2025-01-20 - v1.0:**
- ✅ Implementación inicial del modo mantenimiento
- ✅ Animación de partículas
- ✅ Placeholder azul temporal
- ✅ Documentación completa

---

**Autor:** Claude AI Assistant  
**Estado:** ✅ Implementado, documentado y en producción