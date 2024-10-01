# TODO

- ✅ Ponerle type=date al form de Paciente
- ✅ Refactorizar el envío de datos (ahora se envían con el formato ISO - [yyyy-mm-ddThh:mm])
- ✅ Los mensajes de confirmación/información/alerta/etc. deberían ser - globales
- ✅ Limpiar y formatear los datos en el frontend
- ✅ Agregar validación de campos en el backend
  - ✅ ¿Están los campos que necesitamos para convertir el form a una entity?
  - ✅ ¿Hay campos extras que no deberían estar ahí?
  - ✅ Solo enviar al backend los campos que necesita
- ✅ Validar los datos EN EL MODELO (Mongoose) (ver documentación)
- Mensajes de información en el frontend <------ ACTUAL
- Vista de historia clínica funcional
  - ✅ reducer para historia clínica
  - ✅ hook para historia clínica
  - ✅ Pasarle el paciente activo
  - ✅ Rellenar los campos con los del paciente activo
  - Fotos
  - Receta
- Agregar botones de desplazamiento en la lista de entidades (⏮️◀️ ▶️⏭)

# Frontend

1. Seleccionar campos necesarios
2. Trim

# Backend

1. Verificar campos necesarios
2. Validar campos
3. Convertir
4. Acciones
