document.getElementById('cesar-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const message = document.getElementById('message').value.trim();
    const shift = parseInt(document.getElementById('shift').value);
    const operation = document.getElementById('operation').value;
    let result = '';
  
    // Limpiar errores anteriores
    document.getElementById('message-error').textContent = '';
    document.getElementById('shift-error').textContent = '';
  
    // Validaciones
    let isValid = true;
  
    // Validación del mensaje
    if (!message) {
      document.getElementById('message-error').textContent = 'Por favor, ingresa un mensaje válido.';
      isValid = false;
    }
  
    // Validación del desplazamiento
    if (isNaN(shift) || shift <= 0) {
      document.getElementById('shift-error').textContent = 'Por favor, ingresa un número positivo para el desplazamiento.';
      isValid = false;
    }
  
    if (!isValid) return;
  
    // Función para cifrar y descifrar usando el Cifrado César
    function cesarCipher(text, shift, encrypt = true) {
      const alphabet = 'abcdefghijklmnopqrstuvwxyz';
      const shiftFactor = encrypt ? shift : -shift;
  
      return text.toLowerCase().split('').map(char => {
        const index = alphabet.indexOf(char);
        if (index === -1) return char; 
        const newIndex = (index + shiftFactor + 26) % 26;
        return alphabet[newIndex];
      }).join('');
    }
  
    // Cifrar o descifrar según la operación seleccionada
    try {
      if (operation === 'encrypt') {
        result = cesarCipher(message, shift, true);
      } else {
        result = cesarCipher(message, shift, false);
      }
      document.getElementById('result').textContent = result;
    } catch (error) {
      document.getElementById('result').textContent = 'Ocurrió un error durante el proceso.';
    }
  });
  