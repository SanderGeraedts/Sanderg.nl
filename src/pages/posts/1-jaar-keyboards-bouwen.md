---
title: 1 Jaar Keyboards Bouwen
permalink: /posts/1-jaar-keyboards-bouwen
description: Vandaag exact 1 jaar geleden heb ik mijn soldeerbout voor het eerst
  aangezet en begonnen mijn eerste toetsenbord te bouwen. Nu 1 jaar later is dat
  volgens mijn verloofde uitgelopen tot een obsessie. Ik spreek liever over een
  gezonde hobby. In deze post wil ik jullie meenemen door de toetsenborden die
  ik dit jaar heb gemaakt.
publishDate: 2023-09-11T18:11:56.215Z
layout: ../../layouts/blog-layout.astro
---
Vandaag exact 1 jaar geleden heb ik mijn soldeerbout voor het eerst aangezet en begonnen mijn eerste toetsenbord te bouwen. Nu 1 jaar later is dat volgens mijn verloofde uitgelopen tot een obsessie. Ik spreek liever over een gezonde hobby. In deze post wil ik jullie meenemen door de toetsenborden die ik dit jaar heb gemaakt.

## \#1 - E﻿erste Macropad

1﻿1 september 2022 heb ik voor het eerst mijn soldeerbout uit de verpakking gehaald om daadwerkelijk iets er mee te doen, nadat ik hem al zo'n 10 jaar had laten verstoffen. Het daadwerkelijk bouwen heb ik in een vorige post, dus dat kan je hier lezen: [3D-printed hand-wired Macro pad met Raspberry Pi Pico, KMK & CircuitPython](https://sanderg.nl/posts/3d-printed-hand-wired-macro-pad-met-raspberry-pi-pico-kmk-circuitpython/).

![Foto van macropad](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto,w_1024/v1682454351/projects/macropad.jpg)

## \#2 - Eerste volledige toetsenbord - Janky ReDox2

2﻿ weken daarna heb ik mijn eerste volledige toetsenbord gemaakt, gebaseerd op het ReDox ontwerp. Het idee van dit toetsenbord was om het zo snel mogelijk te maken, zodat ik zo snel mogelijk kon wennen aan de nieuwe layout, en bevindingen zo snel mogelijk kon mee nemen in een V2. Keycaps uitzoeken en wachten tot ze bezorgd worden? Duurt te lang, huidige keycaps werken goed zat. Uitzoeken hoe ik met een TRRS kabel een echt gesplitst toetsenbord maak? Duurt te lang en kost mogelijk te veel motivatie, 12 kabels buitendoor laten lopen op de matrix door te trekken werkt ook. Soms is het belangrijk om iets direct goed te doen, maar soms kan je beter een prototype hebben zodat je weet wat je voor de 2de versie anders moet doen.

![Foto van JankDox](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto,w_1024/v1682454337/projects/PXL_20220927_203704993_z028kf.jpg)

## \#3 - 2﻿de toetsenbord - Choc ReDox

Z﻿o'n andere halve maand later was het tijd voor versie 2, mijn lasercut ReDox met low-profile choc switches. Dit was rond de tijd dat ik deelnemer bij de [Maakplek](https://www.maakplek.nl/) werd (aanrader!), en ik wou de laser cutter uit proberen. Ook wou ik kijken of plattere switches misschien ergonomischer zouden zijn (maybe, maar ik vind ze persoonlijk niet fijn). Over dit toetsenbord is ook een post gemaakt: [How To: Split Keyboard met RP2040 en KMK](https://sanderg.nl/posts/how-to-split-keyboard-met-rp2040-en-kmk/).

![Foto van Choc Redox](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto,w_1024/v1682454342/projects/PXL_20221113_142330634_sypucj.jpg)

## \#﻿4 - Mijn eigen ontwerp, de ReReDox

D﻿it toetsenbord heb ik ondertussen het langste op getypt. Vanaf mijn verjaardag, 6 december tot nu. Om in mechanical keyboard enthousiasts termen te praten, dit toetsenbord was mijn end game. Een eigen ontwerp gebaseerd op de Redox layout (wat zelf weer een redesign is van een ander toetsenbord). Het verschil is niet groot, maar de positie van de pink zit ietsje lager, en de knop naast de 5 en de T is omlaag geschoven zodat die direct naast de T zit. Ik merkte dat ik die knop vaak gebruik in mijn werk (zit bij mij de = / + op), en op de oorspronkelijke positie vond ik hem oncomfortabel ver zitten.

H﻿et schermpje wat er op zit gebruik ik om te switchen tussen een MacOS layout en Windows layout. Ideaal als je voor je werk op MacOS werkt, maar thuis op Windows.

![Foto van ReRedox](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto,w_1024/v1682454348/projects/PXL_20221221_154629055.MP_d7t8sl.jpg)

## \#5 - Eerste PCB ontwerp

M﻿ijn eerste PCB toetsenbord was een throwback naar mijn eerste toetsenbord, een macropad. Die deed het overigens nog steeds prima, maar de switches waren Cherry Blacks, en ik ben absoluut geen fan van linear switches. Volgens mij had ik dit in mijn eerste post al aangekaart, maar ik had die switches gekocht omdat dat de enige waren die de lokale elektronica winkel op voorraad had. 

I﻿n ieder geval, mijn eerste PCB ontwerp was redelijk een flop. Om een of andere reden registreerde bovenste rij totaal niet. Signaal zou gewoon goed moeten werken als ik met mijn multimeter er langs ga, maar als ik hem aan sluit op de computer, wordt geen enkele aanslag in de bovenste rij geregistreerd.

![Foto van PCB](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto,w_1024/v1694461448/PXL_20230308_090014778.MP_cnxhdg.jpg)

## \#6 - Hanna's knoppendoosje

O﻿kay, dit is misschien geen toetsenbord in de strakste zin van de betekenis, maar het zijn toetsen op een bord die dingen doen, dus ik vind dat het telt. Hanna's knoppendoosje heb ik gemaakt zodat mijn verloofde dan makkelijk o.a. de lichten in de bureaukamer aan en uit kon doen vanaf haar bureau en de verwarming / ventilator kon bedienen. Het werkt met een Raspberry Pi Pico W die via MQTT praat naar mijn Home Assistant server. De code komt heel erg overeen met een tutorial "Baby's first MQTT call on Arduino", want dat is het in princiepe ook. If button is pressed, send MQTT request. Het hele project is in een dinsdagavond gemaakt omdat ik niet wist wat ik op de Maakplek ging doen die dag.

![Foto van Hanna's knoppendoosje](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto,w_1024/v1694462168/Hanna's%20knoppendoosje.jpg)

## \#﻿7 - Wouter's schuld!

H﻿et bestaan van dit toetsenbord is 100% Wouter's schuld en ik ga hier geen verantwoordelijkheid voor nemen. Als je Martien Meiland een fles wijn geeft, moet je niet verbaasd zijn dat die hem op dringt, en als je Sander veel te schattige keycaps geeft, moet je niet verbaasd zijn dat die er een toetsenbord mee maakt.

D﻿it toetsenbord is een refinement van mijn ReReDox, maar ipv een 2x2 thumb cluster, heeft het een 3x1 thumb cluster. Ik gebruikte de bovenste 2x 2 toesten alleen om te wisselen tussen MacOS en Windows, en om het geluid te bedienen. Dit toetsenbord werd mijn kantoor toetsenbord, dus en op kantoor gebruik ik alleen MacOS.  Dit is ook de reden waarom het geen gesplitst toetsenbord is. Een gesplitst toetsenbord, heeft een kabel extra, waardoor er makkelijker een toets los raakt tijdens het vervoer.

B﻿ij nader inzien was de 90 graden hoek tussen de toetsenborden iets te aggressief, hoewel het nog steeds wel lekker klikt.

![Toetsenbord met schattige keycaps](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto,w_1024/v1694463271/Wouter's%20schuld.jpg)

## \#﻿8 - Ik wou een nieuw macropad

D﻿e titel zegt het eigenlijk wel. Ik wou een nieuw macropad, dus ik maakte een nieuw macropad. Na ongeveer 2 uur van idee tot op de printer, had ik een nieuw redelijk eenvoudig ontwerp gemaakt. Er zitten Akko Lavender Tactile switches in, en voor de prijs zijn ze echt geweldig. Passen wel beter op een wat meer gedempt toetsenbord, want ze zijn nogal luid, maar typen verder heel erg fijn.

![Foto van nieuwe macropad](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto,w_1024/v1694463603/Nieuw%20Macropad.jpg)

W﻿at vooral mijn doel was voor dit toetsenbord, was om de bedrading zo netjes mogelijk te doen. Oordeel zelf.

![Bedrading macropad](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto,w_1024/v1694463641/Nieuw%20Macropad%20-%20wiring.jpg)

## \#﻿9 - End Game v2 of Sunk Cost Fallacy

D﻿it toetsenbord is technisch gezien nog steeds in progress. Midden juli ben ik hier aan begonnen, net na mijn nieuwe macropad. Alle onderdelen waren geprint, alle materialen waren in huis, de kabels waren gebogen, ik had zelfs al een kant helemaal gesoldeerd. Ik hoefde alleen nog maar de andere helft te solderen en de code te schrijven. 

![Foto van SGDox Mk1](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto,w_1024/v1694465110/SGDox%20mk1.jpg)

M﻿aar hoe verder ik in het project kwam, hoe meer ik begon te twijfelen of dit daadwerkelijk een upgrade was. Het ontwerp was een stuk groter dan mijn huidige ontwerp, en het enige wat het biedt, is 2 draaiknoppen, en ietsje fijnere switches ([Tecsee Tactile Snowglobe](https://splitkb.com/collections/switches-and-keycaps/products/tecsee-tactile-snowglobe), duidelijk meer tactile dan Cherry Browns, maar niet zo "All Tactile, All day" als de Akko Lavender switches. Fijne midden-mode). Ik heb toen het project aan de kant gezet, en ben opnieuw begonnen. 

U﻿it dit opzij zetten is de SGDox Mk 2 voort gekomen, en hoewel die nog niet af is, ben ik hier al een stuk meer tevreden over dan over de Mk 1. Dit project is tijdelijk on-hold gezet door de verhuizing, en de vraag is nu dus of ik deze af maak, of dat er eerst nog een Mk 3 gaat komen. Ik neig steeds meer naar de laatste optie.

![Foto van SGDox Mk2](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto,w_1024/v1694465643/SGDox%20Mk%202.jpg)

## \#﻿10, #11 & #12 - PCB toetsenbord, maar dan wel goed!

D﻿oor de verhuizing hadden Hanna en ik op eens allebei een aparte werk en game plek. Voordeel hiervan is een fysieke scheiding tussen werk en ontspanning, nadeel is dat je dan steeds je toetsenbord moet verplaatsen, of een extra moet hebben. Handwiring wanneer je ergens tussen de 2 en 5 toetsenborden nodig hebt, kost veel tijd. Gelukkig heeft [Joe Scotto](https://www.youtube.com/@joe_scotto) ongeveer een maand geleden een post op zijn YouTube account geplaatst waarin hij zijn PCB tutorial aan kondigde, met een link naar een samengestelde library voor KiCAD, een PCB ontwerp tool. Bij de Maakplek heb ik al eens een hele goeie KiCAD workshop gehad van Inne (Thanks Inne <3), dus ik was hier al enigzins mee bekend. Het enige wat mij altijd heeft weerhouden van toetsenborden hier mee te ontwerpen is dat  je dan voor elk component een andere symbol en footprint library moest zoeken, of zelf maken. Hierdoor had ik bij mijn eerste PCB ontwerp voor EasyEDA gekozen, die alle benodigden footprints ingebakken had.

M﻿et de library van Joe Scotto was het echter binnen 2 uur ontworpen en besteld. Paar weken later kreeg ik 5 perfecte PCB's binnen. Diezelfde dag heeft Joe Scotto zijn PCB tutorial live gezet, en ben ik bijna meteen achter een fout gekomen waardoor de pijltjes toetsen niet werken. Mk2 is dus in de maak!

V﻿oor mij is het feit dat de pijltjes toetsen niet werken geen ramp, aangezien ik toch liever IJKL gebruik als pijltjes toetsen. Ik had gedacht dat dit voor Hanna een groter probleem zou zijn, maar die vind het voor nu ook niet erg. 

![Mijn Keeb](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto,w_1024/v1694466801/Mijn%20PCB%20Keeb.jpg)

Hanna vind die van haar zo fijn dat ik ondertussen bezig met nog een 3de PCB te solderen, zodat ze er boven 1 heeft en onder een. Dit is haar huidige toetsenbord.

![Hanna's keeb.](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto,w_1024/v1694466798/Hanna's%20PCB%20Keeb.jpg)

## \#﻿ to infinity, and beyond!

V﻿oor de toekomst heb ik al weer een aantal plannen. Als eerste natuurlijk de v2 van mijn PCB keebs (en die misschien een goeie naam geven...). Daarnaast zit ik te denken aan een gaming macropad/toetsenbord te maken, vergelijkbaar met het [GameBoard](https://www.reddit.com/r/ErgoMechKeyboards/comments/1694hxo/gameboard_half_of_an_ergo_keyboard_for_gaming/) van [u/zzeneg](https://www.reddit.com/user/zzeneg/) op Reddit. 

![GameBoard van u/zzeneg](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto,w_1024/v1694467992/GameBoard_zo4uwv.webp)

M﻿ogelijk gaat er nog een Mk3 komen van mijn SGDOX, of ik maak het huidige Work In Progress af. Nog in ieder geval genoeg te doen!