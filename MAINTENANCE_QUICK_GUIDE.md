# 🚀 Guía Rápida - Modo Mantenimiento

## ⚡ Cambios Rápidos

### ✅ Activar Mantenimiento
```bash
# En next.config.ts cambiar:
MAINTENANCE_MODE: 'true'

npm run build
# Subir al servidor
```

### ✅ Desactivar Mantenimiento
```bash
# En next.config.ts cambiar:
MAINTENANCE_MODE: 'false'

npm run build
# Subir al servidor
```

### ✅ Subir al Servidor
```bash
npm run build
sshpass -p 'PASSWORD' scp -r out/* root@66.29.133.107:/var/www/thetreeway.com/
```

## 📱 Estado Actual
- ✅ **Modo mantenimiento ACTIVO**
- ✅ **Logo real implementado**
- ✅ **En producción:** thetreeway.com
- ✅ **Backups seguros realizados**

## 🛡️ Backups Disponibles
- `/root/backups/20250720_131056/www_backup/` (VPS completo)
- `/root/backups/thetreeway_backup_20250720_131128.tar.gz` (TheTreeWay específico)

## 📞 Contacto
- **WhatsApp:** +584121010744 (funcional en página mantenimiento)
- **Servidor:** 66.29.133.107 (root)

---
Ver `MAINTENANCE_MODE.md` para documentación completa.