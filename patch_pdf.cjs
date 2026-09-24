const fs = require('fs');
const files = [
  'src/pages/admin/PedidosAdmin.jsx',
  'src/pages/mobile/MobilePedidosAdmin.jsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // Fix align center issue by replacing with manual coordinates
  content = content.replace(/doc\.text\("MINIPOS RESTAURANTE", 40, 10, \{ align: "center" \}\)/g, 'doc.text("MINIPOS RESTAURANTE", 10, 10)');
  content = content.replace(/doc\.text\("FACTURA DE VENTA", 40, 16, \{ align: "center" \}\)/g, 'doc.text("FACTURA DE VENTA", 15, 16)');
  content = content.replace(/doc\.text\("FACTURA DE VENTA", 40, 10, \{ align: "center" \}\)/g, 'doc.text("FACTURA DE VENTA", 15, 10)');
  content = content.replace(/doc\.text\("¡Gracias por su compra!", 40, y \+ 5, \{ align: "center" \}\)/g, 'doc.text("¡Gracias por su compra!", 20, y + 5)');
  content = content.replace(/doc\.text\("Gracias por su compra!", 40, y \+ 5, \{ align: "center" \}\)/g, 'doc.text("¡Gracias por su compra!", 20, y + 5)');
  content = content.replace(/doc\.text\("COMANDA DE COCINA", 40, 10, \{ align: "center" \}\)/g, 'doc.text("COMANDA DE COCINA", 10, 10)');
  
  // Make everything bold
  content = content.replace(/doc\.setFont\("helvetica", "normal"\)/g, 'doc.setFont("helvetica", "bold")');

  fs.writeFileSync(f, content);
  console.log('Patched ' + f);
});
