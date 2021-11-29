const agendayear = document.getElementById("agenda-year");
const prevmonth = document.getElementById("prev-month");
const nextmonth = document.getElementById("next-month");
const days = document.getElementById("days");
const daycontent = document.getElementById("day-content");
let date_changes = new Date();

prevmonth.addEventListener('click', () => {
    $(".loader-wrapper").show();
    $('#days').slick('unslick');
        if (date_changes.getMonth() == 0){
            date_changes.setMonth(date_changes.getMonth() - 1);
            getDaysArray(date_changes.getFullYear() - 1, 12);

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
              // date_changes.setFullYear(date_changes.getFullYear() - 1);
              
        }
        else{
            getDaysArray(date_changes.getFullYear(), date_changes.getMonth());

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
            
            date_changes.setMonth(date_changes.getMonth() - 1);
        }
    $(".loader-wrapper").fadeOut("slow");
});
    
nextmonth.addEventListener('click', () => {
    $(".loader-wrapper").show();
    $('#days').slick('unslick');
        if (date_changes.getMonth() == 11){
            date_changes.setMonth(date_changes.getMonth() + 1);
            getDaysArray(date_changes.getFullYear(), 1);
            
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
    
            // date_changes.setFullYear(date_changes.getFullYear() + 1);
            
            console.log(date_changes.getFullYear(), date_changes.getMonth());
        }
        else{
            getDaysArray(date_changes.getFullYear(), date_changes.getMonth() + 2);
    
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
            console.log(date_changes.getMonth());
        }
    $(".loader-wrapper").fadeOut("slow");
}); 


const getDaysArray = (function() {
    const divmonth = document.getElementById("months");
    const weekdays = Object.freeze([ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ]);
    return (year, month) => {
      days.innerHTML = "";
      daycontent.innerHTML = "";
      const monthIndex = month - 1;
      const date = new Date(year, monthIndex, 1);
      const result = [];
      agendayear.innerHTML = `Tu agenda ${year}`;
      divmonth.innerHTML = `<h1 class="text-center">${getMonthName(monthIndex).toUpperCase()}</h1>`;
      prevmonth.innerHTML = `<a href="#" class="a-month"><i class="fas fa-chevron-left"></i> ${getMonthName(monthIndex - 1).toUpperCase()}</a>`;
      nextmonth.innerHTML = `<a href="#" class="a-month">${getMonthName(monthIndex + 1).toUpperCase()} <i class="fas fa-chevron-right"></i></a>`;
      while (date.getMonth() == monthIndex) {
        // result.push(`${date.getDate()}-${names[date.getDay()]}`);
        days.innerHTML += `
                        <div class="text-center btn-contact rounded mx-2">
                        <a class="agenda-day" data-toggle="collapse" href="#a${date.getDate()}${date.getMonth()+1}${date.getFullYear()}" role="button" aria-expanded="false" aria-controls="a${date.getDate()}${date.getMonth()+1}${date.getFullYear()}">
                            <h2>${date.getDate()}<h2>
                            <h5>${weekdays[date.getDay()]}</h5>
                        </a>
                        </div>`
        daycontent.innerHTML += `
                            <div class="collapse" id="a${date.getDate()}${date.getMonth()+1}${date.getFullYear()}">
                              <div class="card card-body">
                                Some placeholder content for the collapse component in ${date.getDate()}${date.getMonth()+1}${date.getFullYear()} 
                              </div>
                            </div>`
      date.setDate(date.getDate() + 1);
      }
      return result;
    }
  })();

const getMonthName = (function() {
    /** Empleada en la función de días, por ello no se resta uno al mes para el índice del arreglo **/
    const months = Object.freeze(["enero", "febrero", "marzo", 
    "abril","mayo" , "junio", "julio", "agosto", "septiembre", "octubre", 
    "noviembre", "diciembre"]);
    return (month) => {
        if(month == 12){
            return months[0] + " " + (date_changes.getFullYear() + 1);
        }
        else if(month == -1){
            return months[11] + " " + (date_changes.getFullYear() - 1);
        }
        return months[month];
    }
})();

// let array = getDaysArray(2021,11);

$(document).ready(function(){
    $('#days').slick({
        slidesToShow: 7,
        slidesToScroll: 7,
        // focusOnSelect: true,
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

//Let the calendar change when clicking other days.
let $myGroup = $('#day-content');
$myGroup.on('show.bs.collapse','.collapse', function() {
    $myGroup.find('.collapse.show').collapse('hide');
});
