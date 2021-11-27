const agendayear = document.getElementById("agenda-year");
const prevmonth = document.getElementById("prev-month");
const nextmonth = document.getElementById("next-month");
const days = document.getElementById("days");
let date_changes = new Date();

prevmonth.addEventListener('click', () => {
    $(".loader-wrapper").show();
    $('#days').slick('unslick');
        if (date_changes.getMonth() == 0){
            getDaysArray(date.getFullYear() - 1, 11);
            date_changes.setFullYear(date_changes.getFullYear() - 1);

            $(document).ready(function(){
                $('#days').slick({
                    slidesToShow: 7,
                    slidesToScroll: 7,
                    responsive: [
                        {
                          breakpoint: 1024,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                          }
                        },
                        {
                          breakpoint: 600,
                          settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                          }
                        },
                        {
                          breakpoint: 480,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                          }
                        }
                      ]
                });
              });
    
        }
        else{
            getDaysArray(date_changes.getFullYear(), date_changes.getMonth());
            date_changes.setMonth(date_changes.getMonth() - 1);

            $(document).ready(function(){
                $('#days').slick({
                    slidesToShow: 7,
                    slidesToScroll: 7,
                    responsive: [
                        {
                          breakpoint: 1024,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                          }
                        },
                        {
                          breakpoint: 600,
                          settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                          }
                        },
                        {
                          breakpoint: 480,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                          }
                        }
                      ]
                });
              });
        }
    $(".loader-wrapper").fadeOut("slow");
});
    
nextmonth.addEventListener('click', () => {
    $(".loader-wrapper").show();
    $('#days').slick('unslick');
        if (date_changes.getMonth() == 11){
            getDaysArray(date.getFullYear() + 1, 0);
            
            $(document).ready(function(){
                $('#days').slick({
                    slidesToShow: 7,
                    slidesToScroll: 7,
                    responsive: [
                        {
                          breakpoint: 1024,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                          }
                        },
                        {
                          breakpoint: 600,
                          settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                          }
                        },
                        {
                          breakpoint: 480,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                          }
                        }
                      ]
                });
              });
    
            date_changes.setFullYear(date_changes.getFullYear() + 1);
        }
        else{
            getDaysArray(date_changes.getFullYear(), date_changes.getMonth() + 1);
    
            $(document).ready(function(){
                $('#days').slick({
                    slidesToShow: 7,
                    slidesToScroll: 7,
                    responsive: [
                        {
                          breakpoint: 1024,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                          }
                        },
                        {
                          breakpoint: 600,
                          settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                          }
                        },
                        {
                          breakpoint: 480,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                          }
                        }
                      ]
                });
              });
    
            date_changes.setMonth(date_changes.getMonth() + 1);
        }
    $(".loader-wrapper").fadeOut("slow");
}); 


const getDaysArray = (function() {
    const divmonth = document.getElementById("months");
    const weekdays = Object.freeze([ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ]);
    return (year, month) => {
      days.innerHTML = "";
      const monthIndex = month - 1;
      const date = new Date(year, monthIndex, 1);
      const result = [];
      agendayear.innerHTML = `Tu agenda ${year}`;
      divmonth.innerHTML = `<h1 class="text-center">${getMonthName(monthIndex).toUpperCase()}</h1>`;
      prevmonth.innerHTML = `<a href="#" class="a-month"><i class="fas fa-chevron-left"></i> ${getMonthName(monthIndex - 1).toUpperCase()}</a>`;
      nextmonth.innerHTML = `<a href="#" class="a-month">${getMonthName(monthIndex + 1).toUpperCase()} <i class="fas fa-chevron-right"></i></a>`;
    //   console.log(weekdays[date.getDay()]);
      while (date.getMonth() == monthIndex) {
        // result.push(`${date.getDate()}-${names[date.getDay()]}`);
        days.innerHTML += `
                        <div class="text-center bg-lightred rounded mx-2">
                            <h2>${date.getDate()}<h2>
                            <h5>${weekdays[date.getDay()]}</h5>
                        </div>`
                        console.log(`${date.getDate()}-${weekdays[date.getDay()]}`)
      date.setDate(date.getDate() + 1);
      }
      return result;
    }
  })();

const getMonthName = (function() {
    /** Empleada en la función de días, por ello no se resta uno al mes para el índice del arreglo**/
    const months = Object.freeze(["enero", "febrero", "marzo", 
    "abril","mayo" , "junio", "julio", "agosto", "septiembre", "octubre", 
    "noviembre", "diciembre"]);
    return (month) => {
        if(month == 12){
            return months[0];
        }
        return months[month];
    }
})();

// let array = getDaysArray(2021,11);

$(document).ready(function(){
    $('#days').slick({
        slidesToShow: 7,
        slidesToScroll: 7,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    });
  });