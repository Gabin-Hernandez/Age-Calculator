const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const submit = document.getElementById("button");

const resultYears = document.querySelector(".numbers p:nth-child(1)");
const resultMonths = document.querySelector(".numbers p:nth-child(2)");
const resultDays = document.querySelector(".numbers p:nth-child(3)");


submit.addEventListener("click", function () {
  // valida la fecha ccon los valores ingresados
  if (!ValidDate(day.value, month.value, year.value)) {
    alert("Por favor ingresa una fecha válida.");
    return;
  }
  // si es valida, entonces calcula la edad
  const { years, months, days } = calculateAge(day.value, month.value, year.value);
  // inyectamos al DOM
  resultYears.textContent = years;
  resultMonths.textContent = months;
  resultDays.textContent = days;
});

// FUNCIONES PARA CALCULAR
function ValidDate(day, month, year) {
    // Convertir a números, al poner 10 le indicamos que la cadena debe interpretarse con un numero decimal con base 10
    const d = parseInt(day, 10); 
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);
  
    // se verifica que no sea mayor a 2024 o menor a 1900
    if (y > 2024 || y < 1900) {  
      return false;
    }
  
    // El mes debe estar entre 1 y 12
    if (m < 1 || m > 12) {
      return false;
    }
  
    // verificar cuantos dias tiene el mes que el usuario ingreso
    let diasEnMes = 31;
    switch (m) {
      case 4: // Abril
      case 6: // Junio
      case 9: // Septiembre
      case 11: // Noviembre
        diasEnMes = 30;
        break;
      case 2: // Febrero
        // Comprobar si es año bisiesto
        // primero dividimos entre 4 pq un año bisiesto es divisible entre 4
        // si es divisible entre 100 no sera bisiesto entonces haremos otra validacion
        //si el año es divisbile por 400 entonces si es 
        if ((y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0)) {
          diasEnMes = 29;
        } else {
          diasEnMes = 28;
        }
        break;
    }
  
    // El día debe estar entre 1 y los días máximos del mes
    if (d < 1 || d > diasEnMes) {
      return false;
    }
  
    // Si pasó todas las validaciones, la fecha es válida
    return true;
    // este true anula el primer if del submit
  }
  
  
function calculateAge(day, month, year) {
  // convertir a numeros
  const d = parseInt(day, 10);
  const m = parseInt(month, 10) - 1; // vamos del mes 0 al 11
  const y = parseInt(year, 10);

  const birthDate = new Date(y, m, d);
  const today = new Date();

  // se hace una resta de cada valor
  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  // si el dia actual es menor q el dia ingresado, se ajustan meses y dias
//   por ejemplo, si hoy es 4 de abril y el usuario ingreso 10 de abril se activa
  if (ageDays < 0) {
    // se resta un mes
    ageMonths--;
    // se obtienen la cantidad de dias en el mes 
    // getFullYear obtiene el año actual, getmonth obtiene el mes actual y 0 representa el dia 
    // 0 del mes especificado, q seria el ultimo dia del mes anterior
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    ageDays = prevMonth + ageDays; 
  }

  // si el mes actual es menor que el mes ingresado 
  if (ageMonths < 0) {
    ageYears--;
    ageMonths = 12 + ageMonths; 
  }

  return { years: ageYears, months: ageMonths, days: ageDays };
}


