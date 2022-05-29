class Osoba {
  constructor(nazwisko, imie, wiek, h_pracy, h_urlopu, przydzial)
{
  this.nazwisko = nazwisko;
  this.imie = imie;
  this.wiek = wiek;
  this.h_pracy = h_pracy;
  this.h_urlopu = h_urlopu;
  this.etat = function () {
    let sum = (Number( h_pracy ) + Number( h_urlopu )) / (21 * 8);
    let rounded = Math.round(sum * 100) / 100;
    return rounded;
  }
  this.przydzial = przydzial;
  this.iloscPrzydzial = function () {
    return this.przydzial.length;
  }
}
}
let Dane = [];

window.onload = function () {
  let json = '[{"nazwisko":"Nowak","imie":"Krystyna","wiek":"31","g_pracy":"100","g_urlopu":"68","etat":"1","przydzial":["biuro","logistyka","księgowość"],"l_przydzialow":"3"},{"nazwisko":"Stwittera","imie":"Julka","wiek":"18","g_pracy":"12","g_urlopu":"2","etat":"0.08","przydzial":["biuro"],"l_przydzialow":"1"}]';
  json = JSON.parse(json);
  // console.table(json);
  Dane = json;
  let Bufor = [...Dane];

  // read arrays
  function Create() {
    let tabbody = document.getElementById( 'list' );
    for( i=0; i<Dane.length; i++){
      let row = document.createElement( 'tr' );
      let obj = Dane[i];
      for( x in obj ) {
        let cel = document.createElement( 'td' );
        if( typeof(obj[x]) === 'object' ) {
          let list = document.createElement('ul');
          for( y of obj.przydzial ) {
            let item = document.createElement( 'li' );
            item.innerHTML = y;
            list.appendChild( item );
          }
          cel.appendChild( list );
        } else if( typeof(obj[x]) === 'function' ) {
          cel.innerHTML = obj[x]();
        } else {
          cel.innerHTML = obj[x];
        }
        row.append( cel );
      }
      tabbody.appendChild( row );
    }
    // checkbox append to right
    $('tbody#list tr').append('<label class="container"><input type="checkbox"> <span class="checkmark"></span> </label>')
  }

  function Earse(){
    $("tbody#list").html("");
  }

  Create();

  let clicked, td, th, data = $('#data');

  // read table to input
  $('tbody#list').on('click', 'td', function(e) {
    clicked = $(this);
    data.focus();
    td = $(this).closest("tr").index();
    th = $(this).closest("td").index();
    if( $(this).text() == '' ) {
      data.val('');
      data.attr('placeholder', 
      'Wprowadz wartość ..');
    } else {
      switch(th){
        case 0:
          data.val(Dane[td].nazwisko);
          break;
        case 1:
          data.val(Dane[td].imie);
          break;
        case 2:
          data.val(Dane[td].wiek);
          break;
        case 3:
          data.val(Dane[td].g_pracy);
          break;
        case 4:
          data.val(Dane[td].g_urlopu);
          break;
        case 5:
          data.val(Dane[td].etat);
          break;
        case 6:
          var str = String(Dane[td].przydzial);
          var rep = str.split(',').join(', ');
          data.val(rep);
          break;
        case 7:
          data.val(Dane[td].iloscPrzydzial);
          break;
      }
    }
    // .log(th + " " + td);
    e.preventDefault();
  });

  $('tfoot#input').on('click', 'td', function(e) {
    clicked = $(this);
    data.focus();
    th=' '; td=' ';
    if( $(this).text() == '' ) {
      data.val('');
      data.attr('placeholder', 
      'Wprowadz wartość ..'); 
    } else {
      data.val($(this).text());
    }
    e.preventDefault();
  });

  // write to table
  data.keyup(function() {
    switch(th){
      case 0:
        Dane[td].nazwisko = data.val();
        break;
      case 1:
        Dane[td].imie = data.val();
        break;
      case 2:
        Dane[td].wiek = data.val();
        break;
      case 3:
        //Dane[td].g_pracy = data.val();
        break;
      case 4:
        //Dane[td].g_urlopu = data.val();
        break;
      case 5:
        //Dane[td].etat = data.val();
        break;
      case 6:
        var arr = data.val().replace(/,\s+/g, ',').split(',');
        Dane[td].przydzial = arr;
        break;
      case 7:
        //Dane[td].iloscPrzydzial = data.val();
        break;
      default:
        clicked.text(data.val());
        break;
    }
    Earse();
    Create();
  });

  function Submit() {   
    var arr = $('tfoot #przydzial').text() != '' ?
      $('tfoot #przydzial').text().replace(/,\s+/g, ',').split(',') :
      [];
    Dane.push( new Osoba(
      $('tfoot #nazwisko').text(),
      $('tfoot #imie').text(),
      $('tfoot #wiek').text(),
      $('tfoot #g_pracy').text(),
      $('tfoot #g_urlopu').text(),
      arr
    ) );
    Earse();
    Create();
    $('tfoot#input').find('td').each (function() {
      $(this).text('');
    });
  }

  // add to table and array
  $('button.btn').click(function() {
    Submit();
    // console.log(Dane);
  });

  // block enter in input
  $('input').keypress(function (e) {
    if (e.keyCode === 10 || e.keyCode === 13) {
        e.preventDefault();
    }
  });

  // menu
  let dpd;
  $('.dropdown-content').hide();
  $('.dropdown').click(function() {
    dpd = $(this).index();
    $(this).children().eq(1).toggle();
  });

  $('.dropdown').children().children().click(function() {
    //console.log( dpd +" : "+ $(this).index());
    switch(dpd){
      case 0:
        switch($(this).index())
        {
          case 0:
            Earse();
            Dane = [];
            $('tfoot#input').find('td').each (function() {
              $(this).text('');
            });
            data.val('');
            data.attr('placeholder', 
            'Wprowadz wartość ..'); 
            break;
          case 1:
            Dane = [];
            Dane = [...Bufor];
            // console.log(Bufor);
            Earse();
            Create();
            break;
        }
      break;
      case 1:
        switch($(this).index()){
          case 0:
            //checkbox

            let flag = [];
            $('tbody#list').find('input').each (function(i) {
              flag[i] = Number($(this).prop('checked'));
              i++;
              //console.log(flag);
            });
            
            let stop = Dane.length;
            let i=0; let j=0;
            while(i < stop){
              if(flag[j]==1) { 
                //console.log(i); 
                Dane.splice(i, 1);
                i--;
                stop--;
              }
              i++;
              j++;
            }
            // console.log(flag);
            Earse();
            Create();
            break;
          case 1:
            Submit();
            break;
        }
        break;
    }
  });
}
