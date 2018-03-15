# RaisingTheBAR

## Bendravimas su užsakovu

### Pirkėjo klausimai:

1. Kokia kalbą turėtų būti sukurta svetainė?

  * Nebūtina turėti kelias kalbas, bet bus laikoma privalumu.

2. Ar reikia naudoti kažkokią spalvų paletę?

4. Saugumo reikalavimai slaptažodžiui?

5. Prekių sąrašas pirkėjui - rodomos tik tos kurios yra sandelyje
                             ar visos su galimybe užsisakyti arba pasiteirauti ar bus atvežama daugiau?

7. Ar prekės krepšelyje gali pakeisti kainą, ar turi visada išlaikyti tokią, kuri buvo įdėjimo metu?

9. Ar turi būti galimybė atšaukti užsakymą?

10. Naudojami prisijungimo patogumai: "Remember me", "Forgot password"?

19. Ar turi būti įgyvendintas paspaudimas-skambutis (ang. click-to-call) funkcionalumas įrenginiams su skambinimo funkcionalumu?

20. Ar reikia "atsiminti" vartotojo mokėjimo informaciją?

21. Kokie datos formatai turi būti palaikomi (2017-05-18, 18/05/2017 ir t.t.)?



## Atsakyti klausimai

1. Ar administratoriaus prisijungimo langas turėtų būti pasiekiamas paspaudus tam skirtą mygtuką puslapyje, ar reiktų leisti prieigą tik įvedus tam tikrą URL (pavyzdžiui, www.something.com/admin)? 
  
  * Antras variantas.
  
2. Kokią pirkėjo informaciją mato administratorius? 
  
  * Bendrame sąraše - El. pašto adresas, užsakymų skaičius, bendra užsakymų suma, vidutinė užsakymo suma. Sąraše turi būti galimybė atsidaryti detalesnį kiekvieno pirkėjo langą, kuriame būtų matoma visa užsakymų istorija

3. Dėl blokavimo: ar užblokuotas vartotojas yra blokuojamas laikinai? 

  * Užblokuotą naudotoją galima atblokuoti.

4. Kaip identifikuoti užblokuotą vartotoją (galbūt susieti su banko kortelės numeriu / pristatymo adresu ar pan.)? 
  
  * Unikalus naudotojo identifikatorius yra el. pašto adresas.
  
5. Ką reiškia „vykdyti užsakymą“? Kokie žingsniai į tai įeina? Gal galite parašyti trumpą pavyzdinį scenarijų?
  
  * Administratorius gali keisti užsakymo būsenas: Priimtas (po pavykusio mokėjimo), renkamas, išsiųstas, pristatytas.
  
6. Ar administratorius gali atlikti ir paprasto vartotojo užduotis (t.y. pirkimą ir pan.)? Jei taip, tai ar jam gali būti suteikiamos kokios nors „privilegijos“ (pvz. papildomos nuolaidos prekėms ar pan.)?

  * Administratorius gali prisijungti kaip paprastas naudotojas su tuo pačiu el. pašto adresu. Jokių privilegijų tai nesuteikia.

7. Privalomi laukai registruojantis pirkėjui? Ar prisijungiama e-mailu ar reikia susikurti vartotojo vardą?

  * Prisijungiama su el paštu ir slaptažodžius. Prisijungimas su Google būtų traktuojamas kaip papildomas funkcionalumas.
  
8. Kokius patvirtinimus turi gauti vartotojas apie sėkmingą užsakymą(email, ar tik puslapyje pranešimas)?

  * El. laiškas nepivalomas - laikoma privalumu.
  
9. Ar įdėjus prekę į krepšelį, atsijungus ir tada vėl prisijungus, prekės vis dar lieka krepšelyje? Jei taip, tai ar šis funkcionalumas reikalingas tik naudojant sistemą tame pačiame įrenginyje, ar turi išsisaugoti ir prisijungus, tarkim, per kitą kompiuterį?

  * Turi išsisaugoti ir naudojantis skirtingais įrenginiais.
  
10. Ar neprisijungusiems vartotojams galima prekes dėti į krepšelį ir atlikti pirkimus?
  
  * Taip, tačiau prieš pat atliekant apmokėjimą turi būti paprašoma prisijungti.

11. Kaip turėtų elgtis sistema, jei tam tikros prekės sandėlyje nebėra, bet kažkuris vartotojas šią prekę dar turi krepšelyje ir nori pirkti?
  
  * Likučiai šitoje sistemoje neturi būti sekami, tarkime, kad prekių visada bus.

12. Kas turi sudaryti prekės aprašymą (paprastas tekstinis aprašas ar konkrečių savybių lentelė / sąrašas)? 
  
  * Paprastas tekstinis aprašas

13. Kokio pobūdžio prekėmis planuojama prekiauti?
  
  * Įvairaus.
  
14. Ar turi būti išskirta vieta reklamai? 

  * Ne.

15. Ar galima pasirinkti perkamos prekės kiekį? 

  * Taip.
  
16. Ar reikalingi informaciniai puslapiai(kontaktai, prekių grąžinimo taisyklės)? 

  * Ne.
  
17. Ar reikalingas prekių filtravimas? 

  * Taip.
  
18. Ar reikalinga prekių paieška? 

  * Taip.
  
19. Kokia numatoma serverio apkrova?
  
  * Tikimasi, kad sistema sugebės palaikyti didėjančias apkrovas augant verslo poreikiams.
  
## ToDo sąrašas


### Techninę ataskaitą

  *Nusakyti sukurtos sistemos struktūrą ir parinktas technologijas (kiek architektūrinių sluoksnių naudojama, kaip jie išdėstyti, kokia/kokios technologijos naudojamos kiekviename sluoksnyje) - ne daugiau 0.5 puslapio

#### Kokybiniai reikalavimai

  *Vienas naudotojas gali dirbi su sistema (tame tarpe redagavimo/administravimo režimu) keliuose naršyklės languose (tiek window, tiek tab prasme) tuo pačiu metu, naudodamas tą pačią paskyrą/sesiją (account / login session)
  
  *Sistema turi būti apsaugota nuo SQL injection atakų
  
  *ORM (pvz.: JPA, Entity Framework) ir Data Mapper (pvz. MyBatis, LINQ) technologijos turi būti naudojamos ten, kur prasminga (nekenkia našumui, gerina plečiamumą/lankstumą). Jokia duomenų bazės transakcija (taip pat ir lentelės įrašų rakinimas – locking) neturi apimti interakcijos su naudotoju (pvz.: pradedame transakciją, laukiame kol naudotojas užpildys Web formą, pabaigiame transakciją – labai blogai!). DB transakcija turi prasidėti ir pasibaigti vienos ir tos pačios HTTP užklausos (request) metu (nesvarbu, ar tai AJAX užklausa, ar ne)
  
  *Keliems naudotojams (arba vienam keliuose naršyklės languose) tyčia/netyčia redaguojant tą patį DB objektą ir, kylant redaguojamų duomenų versijų konfliktui
  
  *Parinkti techniniai projektiniai sprendimai turi būti orientuoti į taupų atminties (RAM) naudojimą
  
  *Serveryje ilgai trunkanti operacija neturi priversti naršyklės ilgai laukti atsakymo. Naršyklės puslapis privalo likti "gyvas“ (responsive)

  *Visi dalykinio funkcionalumo (business logic) veiksmai privalo būti žurnalizuojami (fiksuojami faile arba DB), įrašant naudotojo vardą, teises, laiką, vykdomą metodą (klasės pavadinimas + metodo pavadinimas). Tam, kad žurnalizavimo kodą įjungti/išjungti/pakeisti, neturi reikėti modifikuoti/perkompiliuoti stebimo sistemos kodo. (Hint: https://damienbod.com/2015/09/15/asp-net-5-action-filters/)
  
  *Po sistemos sukūrimo turi būti įmanoma arba pakeisti esamą dalykinį algoritmą nauju jo variantu (Strategy design pattern), arba jį "dekoruoti" (Decorator design pattern), taip, kad nereikėtų modifikuoti ir kompiliuoti seno kodo. T.y. būtų pridedamas tik naujas kodas, ir galimai redaguojamas konfigūracinis failas (Hint: https://medium.com/@willie.tetlow/net-core-dependency-injection-decorator-workaround-664cd3ec1246)

## Architektūriniai sprendimai ir jų paaiškinimas


## Svarbios Datos

~~1. Asmeninė studentų registracija: iki balandžio 3 d. 12 val.~~  
~~2. Komandų formavimasis: iki balandžio 6 d. 18 val.~~  
~~3. Komandų priverstinis formavimas: balandžio 8 d.~~  
4. Projektų rezultatų pridavimas: 2017 m. gegužės 31 d. nuo 14 iki 17 val. Naugarduko 204 k.  
5. Projektų gynimai: planuojami birželio 1 ir 4 d.  

## Užrašams

*Naudingos nuorodos: 
	https://www.dropbox.com/s/wubg7147lpvhmu8/nuoroda_geresne.7z?dl=0
	https://www.dropbox.com/s/5t8epcomb4j8yoe/nuoroda.zip?dl=0

*Raktažodžiai (su numeriais prioritezuojami):
1. React
2. Entity framework
3. Bootstrap
4. redux
5. nebereikia ~~kafka (messaging (publish subscribe pvz))~~ (Neapsimoka, fk this)
6. BLL (business logic layer)
7. DAL (data access layer)

## Projekto template dokumentacija
https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md
https://docs.microsoft.com/en-us/aspnet/core/spa/react-with-redux
https://docs.microsoft.com/en-us/aspnet/core/spa/react?tabs=visual-studio


## Komandos suderinamumas pagal zodiako ženklus
https://drive.google.com/file/d/1-oPZGInJK2PZuvvG3IkQTq_jIe3xXpsN/view?usp=sharing
