window.onload = function() { Clock(); }
   
    function Clock() {
     var e = document.getElementById('clock'),
     d = new Date(), h, m, s;
     h = d.getHours();
     m = set(d.getMinutes());
     s = set(d.getSeconds());
   
     e.innerHTML = h +':'+ m +':'+ s;
     if(h < 24){
     	var sayying ="Good Night";
     }
     if(h < 19){
    	var sayying ="Good Afternoon";
    }
     if(h < 15){
    	var sayying ="Good Afternoon";
    }
    if(h < 12){
    	var sayying ="Good Morning";
    }
    if(h < 6){
      var sayying ="Good Subuh";
    }
    if(h < 3){
    	var sayying ="Good Night";
    }    
    document.getElementById("sayying").innerHTML = sayying;
   
     setTimeout('Clock()', 1000);
    }
   
    function set(e) {
     e = e < 10 ? '0'+ e : e;
     return e;
    }

    //Copyright 2
    $(document).ready(function() {
      // Mengosongkan elemen container
      $('#copyright2').empty();
      
      // Mendapatkan tahun saat ini
      var currentYear = new Date().getFullYear();
      
      // Mengatur teks hak cipta
      var copyrightText = "Copyright ©" + currentYear + " By";
      
      // Mengatur URL href
      var href = "https://sanslinedev.tech";
      
      // Membuat elemen anchor (link)
      var anchor = $('<a>').attr('href', href).attr('target', '_blank').addClass('footer-link fw-bolder').text('Sansline Api');
      
      // Menggabungkan teks hak cipta dan anchor ke dalam elemen container
      $('#copyright2').append(copyrightText + ' ');
      $('#copyright2').append(anchor);
  });

  
