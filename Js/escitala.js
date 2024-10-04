document.getElementById('escitala-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const message = document.getElementById('message').value.trim();
  const columns = parseInt(document.getElementById('columns').value);
  const operation = document.getElementById('operation').value;
  let result = '';

  // Limpiar errores anteriores
  document.getElementById('message-error').textContent = '';
  document.getElementById('columns-error').textContent = '';

  // Validaciones
  let isValid = true;

  // Validación del mensaje
  if (!message) {
    document.getElementById('message-error').textContent = 'Por favor, ingresa un mensaje válido.';
    isValid = false;
  }

  // Validación del número de columnas
  if (isNaN(columns) || columns <= 0) {
    document.getElementById('columns-error').textContent = 'Por favor, ingresa un número positivo para las columnas.';
    isValid = false;
  }

  if (!isValid) return;

  // Función para cifrar y descifrar usando el Cifrado Escítala
  function escitalaCipher(text, columns, encrypt = true) {
    const rows = Math.ceil(text.length / columns);
    const grid = Array.from({ length: rows }, () => Array(columns).fill(''));

    if (encrypt) {
      let index = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns && index < text.length; c++) {
          grid[r][c] = text[index++];
        }
      }
      return grid[0].map((_, colIndex) => grid.map(row => row[colIndex]).join('')).join('');
    } else {
      let decrypted = '';
      const charsPerColumn = Math.ceil(text.length / columns);
      let index = 0;

      for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows && index < text.length; r++) {
          grid[r][c] = text[index++];
        }
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          if (grid[r][c]) decrypted += grid[r][c];
        }
      }

      return decrypted;
    }
  }

  // Cifrar o descifrar según la operación seleccionada
  try {
    if (operation === 'encrypt') {
      result = escitalaCipher(message, columns, true);
    } else {
      result = escitalaCipher(message, columns, false);
    }
    document.getElementById('result').textContent = result;
  } catch (error) {
    document.getElementById('result').textContent = 'Ocurrió un error durante el proceso.';
  }
});
