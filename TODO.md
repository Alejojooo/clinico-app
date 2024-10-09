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
- ✅ Vista de historia clínica funcional
  - ✅ reducer para historia clínica
  - ✅ hook para historia clínica
  - ✅ Pasarle el paciente activo
  - ✅ Rellenar los campos con los del paciente activo
  - Fotos
  - Receta
- ✅ Corregir validaciones en updates
- ✅ Deshabilitar los otros botones del CRUD acorde a la acción que se está haciendo
  - ✅ Deshabilitar también el botón de Historia Clínica (TopAppBar)
- ✅ Si se modifica un registro (como cuando se va a actualizar), mostrar un mensaje de "hay cambios aún no guardados" (persistente)
- ✅ Mensajes de información en el frontend
  - ✅ Limpiar el div que contiene los mensajes de información (implm. pendiente de removeSnackbar)
- ✅ Copiar lo realizado para el módulo de historias clínicas.
- ✅ Optimizar la carga de imágenes para imágenes idénticas.
- Agregar función de búsqueda de registros
- Agregar botones de desplazamiento en la lista de entidades (⏮️◀️ ▶️⏭)
- Evitar que la lista de documentos cambie de tamaño al tener muchos documentos.

# Frontend

1. Seleccionar campos necesarios
2. Trim

# Backend

1. Verificar campos necesarios
2. Validar campos
3. Convertir
4. Acciones
