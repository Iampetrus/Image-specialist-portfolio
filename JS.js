

/*
const imagenes = document.querySelectorAll('.imagenes');

 put the click event listener to the parent element
imagenes.forEach((imagen, index) => {
  let count = 0;
  imagen.addEventListener('click', (e) => {
    if (count % 2 == 0) {
      imagen.style.opacity = 0.1;
    } else {
      imagen.style.opacity = 1;
    }
    count++;
  });
});

*/

/* Solucion 1*/
/*
const imagenes = document.querySelectorAll('.imagenes');
const logos = document.querySelectorAll('.logo');

imagenes.forEach((imagen, index) => {
  let count = 0;
  imagen.addEventListener('click', (event) => {
    if (count % 2 == 0) {
      imagen.style.opacity = 0.2;
      logos[index].style.opacity = 1;
    } else {
      imagen.style.opacity = 1;
      logos[index].style.opacity = 0;
    }
    count++;
  });
});
*/

/* Solucion 2 */
/*
[ ...document.querySelectorAll('.box') ].forEach(box => {

    let boxImagenes = box.querySelector('.imagenes');
    let boxLogo = box.querySelector('.logo');
    
    boxImagenes.addEventListener("click", () => {
        boxLogo.classList.replace('hide', 'show');
        boxImagenes.classList.replace('show', 'hide');
    });    
    
    boxLogo.addEventListener("click", () => {
        boxLogo.classList.replace('show', 'hide');
        boxImagenes.classList.replace('hide', 'show');
    });    
});
*/