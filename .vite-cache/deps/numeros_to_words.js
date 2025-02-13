import "./chunk-USJHI7ER.js";

// node_modules/numeros_to_words/numero_to_word/index.js
var config = {
  letrasMonedaPlural: "",
  //"PESOS", 'Dólares', 'Bolívares', 'etcs'
  letrasMonedaSingular: "",
  //"PESO", 'Dólar', 'Bolivar', 'etc'
  letrasMonedaCentavoPlural: "",
  letrasMonedaCentavoSingular: ""
};
function Unidades(num) {
  switch (num) {
    case 1:
      return "UN";
    case 2:
      return "DOS";
    case 3:
      return "TRES";
    case 4:
      return "CUATRO";
    case 5:
      return "CINCO";
    case 6:
      return "SEIS";
    case 7:
      return "SIETE";
    case 8:
      return "OCHO";
    case 9:
      return "NUEVE";
  }
  return "";
}
function Decenas(num) {
  let decena = Math.floor(num / 10);
  let unidad = num - decena * 10;
  switch (decena) {
    case 1:
      switch (unidad) {
        case 0:
          return "DIEZ";
        case 1:
          return "ONCE";
        case 2:
          return "DOCE";
        case 3:
          return "TRECE";
        case 4:
          return "CATORCE";
        case 5:
          return "QUINCE";
        default:
          return "DIECI" + Unidades(unidad);
      }
    case 2:
      switch (unidad) {
        case 0:
          return "VEINTE";
        default:
          return "VEINTI" + Unidades(unidad);
      }
    case 3:
      return DecenasY("TREINTA", unidad);
    case 4:
      return DecenasY("CUARENTA", unidad);
    case 5:
      return DecenasY("CINCUENTA", unidad);
    case 6:
      return DecenasY("SESENTA", unidad);
    case 7:
      return DecenasY("SETENTA", unidad);
    case 8:
      return DecenasY("OCHENTA", unidad);
    case 9:
      return DecenasY("NOVENTA", unidad);
    case 0:
      return Unidades(unidad);
  }
}
function setSingular(singular) {
  config.letrasMonedaSingular = singular;
}
function setPlural(plural) {
  config.letrasMonedaPlural = plural;
}
function setCentsSingular(singular) {
  config.letrasMonedaCentavoPlural = singular;
}
function setCentsPlural(plural) {
  config.letrasMonedaCentavoPlural = plural;
}
function getSingular() {
  return config.letrasMonedaSingular;
}
function DecenasY(strSin, numUnidades) {
  if (numUnidades > 0)
    return strSin + " Y " + Unidades(numUnidades);
  return strSin;
}
function Centenas(num) {
  let centenas = Math.floor(num / 100);
  let decenas = num - centenas * 100;
  switch (centenas) {
    case 1:
      if (decenas > 0)
        return "CIENTO " + Decenas(decenas);
      return "CIEN";
    case 2:
      return "DOSCIENTOS " + Decenas(decenas);
    case 3:
      return "TRESCIENTOS " + Decenas(decenas);
    case 4:
      return "CUATROCIENTOS " + Decenas(decenas);
    case 5:
      return "QUINIENTOS " + Decenas(decenas);
    case 6:
      return "SEISCIENTOS " + Decenas(decenas);
    case 7:
      return "SETECIENTOS " + Decenas(decenas);
    case 8:
      return "OCHOCIENTOS " + Decenas(decenas);
    case 9:
      return "NOVECIENTOS " + Decenas(decenas);
  }
  return Decenas(decenas);
}
function Seccion(num, divisor, strSingular, strPlural) {
  let cientos = Math.floor(num / divisor);
  let resto = num - cientos * divisor;
  let letras = "";
  if (cientos > 0)
    if (cientos > 1)
      letras = Centenas(cientos) + strPlural;
    else
      letras = strSingular;
  if (resto > 0)
    letras += "";
  return letras;
}
function Miles(num) {
  let divisor = 1e3;
  let cientos = Math.floor(num / divisor);
  let resto = num - cientos * divisor;
  let strMiles = Seccion(num, divisor, "MIL", "MIL");
  let strCentenas = Centenas(resto);
  if (strMiles == "")
    return strCentenas;
  return strMiles + " " + strCentenas;
}
function Millones(num) {
  let divisor = 1e6;
  let cientos = Math.floor(num / divisor);
  let resto = num - cientos * divisor;
  let de = "";
  let strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
  let strMiles = Miles(resto);
  if (strMillones == "")
    return strMiles;
  if (strMiles == "")
    strMiles = "de";
  return strMillones + " " + strMiles;
}
function NumeroALetras(num) {
  var data = {
    numero: num,
    enteros: Math.floor(num),
    centavos: Math.round(num * 100) - Math.floor(num) * 100,
    letrasCentavos: ""
  };
  if (data.centavos > 0) {
    data.letrasCentavos = "CON " + function() {
      if (data.centavos == 1)
        return Millones(data.centavos) + " " + config.letrasMonedaCentavoSingular;
      else
        return Millones(data.centavos) + " " + config.letrasMonedaCentavoPlural;
      ;
    }();
  }
  ;
  if (data.enteros == 0)
    return "CERO ";
  if (data.enteros == 1)
    return Millones(data.enteros) + " " + config.letrasMonedaSingular + " " + data.letrasCentavos;
  else
    return Millones(data.enteros) + " " + config.letrasMonedaPlural + " " + data.letrasCentavos;
}

// node_modules/numeros_to_words/index.js
var numero_to_word = function(num = null) {
  var _value = null;
  let data = NumeroALetras(num).trim();
  _value = data;
  return {
    FemaleValue: function() {
      if (_value == "UN " + getSingular())
        _value = "UNA " + getSingular();
      return this;
    },
    Capitalize: function() {
      _value = capitalizeFirstLetter(_value);
      ;
      return this;
    },
    Config: {
      _setSingular: function(singular) {
        setSingular(singular);
      },
      _setPlural: function(plural) {
        setPlural(plural);
      },
      _setCentsSingular: function(singular) {
        setCentsSingular(singular);
      },
      _setCentsPlural: function(plural) {
        setCentsPlural(plural);
      }
    },
    clearConfig: function() {
      setSingular("");
      setPlural("");
      setCentsSingular("");
      setCentsPlural("");
    },
    toString: function() {
      return Sanitizer(_value);
    }
  };
};
function Sanitizer(value) {
  return value.replace("  ", " ");
}
function capitalizeFirstLetter(string) {
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}
var numeros_to_words_default = numero_to_word;
export {
  numeros_to_words_default as default
};
//# sourceMappingURL=numeros_to_words.js.map
