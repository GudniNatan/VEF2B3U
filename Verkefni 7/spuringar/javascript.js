// 1
var x = document.getElementById("two");
x.innerText = x.innerText.replace("Gunnar", "Jakob");

//2
var y = document.getElementById("one");
y.className = "active";

//3
var z = document.getElementById("three");
z.parentNode.removeChild(z);

//4
/*
innerHTML() breytir því sem er innan í einhverju gefnu elementi, eins og nafnið gefur til kynna.
Það er stundum hraðara en DOM-manipulation, en eftir að hafa prófað það virðist það vera hægara í öllum vöfrum nema IE.
innerHTML getur haft áhrif á element sem þú ert búinn að sækja í javascript, 
til dæmis ef þú breytir body-inu með innerHTML missiru tengingar í öll element inni í því.
Það hefur áhrif á event handlera líka.
Ef einhver notar innerHTML á texta frá notendum er hætta á því að notendur setji inn einhver slæmann kóða sem getur valdið alls konar öryggishættum.

DOM-manipulation leyfir þér að breyta elementum svipað og innerHTML en þó með nokkrum lykilmunum.
Það er miklu öruggara en innerHTML.
Það er auðveldara að bæta við elementum með einhverju millibili, ef þú villt ekki leggja of mikið álag á vafrann í einu.
Það er oft hraðara en innerHTML en þó hægara í Internet Explorer, það er samt í raun ekkert allt of mikill hraðamunur í neinu tilviki.
Þú þarft að skrifa meiri kóða til að gera sama hlutinn og með innerHTML.
*/