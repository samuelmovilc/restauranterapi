const fs = require('fs');
const files = [
  'src/pages/admin/PedidosAdmin.jsx',
  'src/pages/mobile/MobilePedidosAdmin.jsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // PedidosAdmin.jsx and MobilePedidosAdmin.jsx
  content = content.replace(/doc\.setFontSize\(14\)\s*doc\.text\("MINIPOS RESTAURANTE", 10, 10\)/g, 'doc.setFontSize(12)\n    doc.text("MINIPOS RESTAURANTE", 5, 10)');
  content = content.replace(/doc\.setFontSize\(10\)\s*doc\.text\("FACTURA DE VENTA", 15, 16\)/g, 'doc.setFontSize(10)\n    doc.text("FACTURA DE VENTA", 15, 16)');
  // Mobile
  content = content.replace(/doc\.setFontSize\(14\)\s*doc\.text\("FACTURA DE VENTA", 15, 10\)/g, 'doc.setFontSize(12)\n      doc.text("FACTURA DE VENTA", 10, 10)');
  
  content = content.replace(/doc\.setFontSize\(14\)\s*doc\.text\("COMANDA DE COCINA", 10, 10\)/g, 'doc.setFontSize(11)\n      doc.text("COMANDA DE COCINA", 8, 10)');
  content = content.replace(/doc\.setFontSize\(14\)\s*doc\.text\("COMANDA DE COCINA", 8, 10\)/g, 'doc.setFontSize(11)\n      doc.text("COMANDA DE COCINA", 8, 10)');

  fs.writeFileSync(f, content);
  console.log('Patched ' + f);
});
