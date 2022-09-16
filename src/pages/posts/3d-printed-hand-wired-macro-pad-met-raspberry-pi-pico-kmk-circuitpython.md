---
title: 3D-printed hand-wired Macro pad met Raspberry Pi Pico, KMK & CircuitPython
permalink: /posts/3d-printed-hand-wired-macro-pad-met-raspberry-pi-pico-kmk-&-circuitpython
englishLink: /en/posts/3d-printed-hand-wired-macro-pad-with-raspberry-pi-pico-kmk-&-circuitpython
description: In deze post leg ik uit hoe ik mijn macro pad heb ontworpen,
  gebouwd en geprogrammeerd. Alles wordt stap voor stap uitgelegd zodat ook jij
  een eigen toetsenbord of macro pad kan maken!
publishDate: 2022-09-16T16:00:36.128Z
layout: ../../layouts/blog-layout.astro
---
Het is al weer even geleden sinds ik een post heb geschreven, en in die tussentijd is er veel gebeurd. Het belangrijkste is dat ik na 3 jaar Sogeti heb verlaten, om verder te gaan als Sr. Frontend Developer bij [Total Design](https://www.totaldesign.com/). Ik ben pas net begonnen, dus ik kan er nog niet veel over vertellen, misschien in een volgende post. Met mijn huidige schema zou dat ongeveer in 2023 moeten zijn. ;-)

![Picture of 3d-printed keypad with 24 keys. The number keys are white, the others are yellow. All have the legends painted in.](/assets/images/pxl_20220916_075655587.jpg "Let niet op die vlek op de =-knop, die bestaat niet.")

In deze post wil ik uitleggen hoe ik mijn nieuwe macro pad heb gemaakt, maar eerst misschien een uitleg waarom ik hem heb gemaakt. Mijn uiteindelijke doel is namelijk om een gesplits keyboard te maken, en specifiek de Redox v1. 

![Picture of a column staggered split keyboard, the redox v1](/assets/images/redox.webp)

Het ding is dat direct een heel toetsenbord maken dapper is. De laatste keer dat ik succesvol gesoldeerd heb, is ergens in mijn jeugd toen ik een cursusje elektro-mechanica heb gedaan. De kans dat ik te veel hooi op mijn vork neem met een volledig toetsenbord te maken, is groot. Een macro pad is een stuk goedkoper, minder werk, en met hoe ik hem heb ontworpen, kan ik veel van de onderdelen hergebruiken als het zou mislukken. Ik heb zoveel vertrouwen in mezelf...

De Redox heeft zoals de meeste split keyboards, geen number pad. Als ik 3d ontwerpen maak in Fusion 360, voer ik heel vaak nummers in via het number pad omdat dat voor mij sneller werkt, dus die is voor mij essentieel, maar niet essentieel genoeg om hem altijd op mijn bureau te moeten hebben.

Als jij er ook een wilt maken, heb je het volgende nodig.

## Bill of Materials

* 24x Cherry MX switches (Ik heb de Blacks gehaald, puur omdat mijn lokale elektronica winkel ze op voorraad had) - €1,45 x 24 = €34,80
* 24x Gelijkrichter diodes (Maakt niet veel uit welke, ik gebruikte de 1N4004) - €5,00 voor 100
* Raspberry Pi Pico - €8,95 (of €44,95 voor 10)
* Montagesnoer - 0.4mm² / 21AWG - €2,60 voor 5m (ik heb rood en zwart gehaald voor onderscheid)
* 4x M3 Schroefdraadinzetstukken - €12,80 voor 100, €28,90 voor set van in totaal 200 M3, M4 en M5's
* 4x M3 schroeven - €3,29 voor een set van 30 inclusief moeren
* 4x Beschermviltjes - €2,19 voor 9
* Soldeertin - €13,45 voor 100g
* Geprinte modellen

### Gereedschap

* 3D-printer
* Soldeerbout
* Kabel stripper
* Multimeter (optioneel als je een soldeergod bent die nooit een fout maakt. Dus haal er 2.)

Ik heb ervoor gekozen om mijn key caps te printen, niet alleen om de kosten te drukken, maar ook zodat ik elk moment nieuwe caps kan printen als ik functionaliteit wil wisselen. Doordat ik de threaded inserts al had (een keer "Schroefdraadinzetstukken" typen is meer dan genoeg), komt de prijs die ik voor de materialen heb moeten betalen uit op €67,88. Dit is meer dan 3x zo duur als de goedkoopste nummer pads die ik bij Coolblue en Mediamarkt kon vinden, maar die zijn natuurlijk niet zelf te programmeren. 

De grootste kosten zaten in de switches, en ik geef toe dat ik die veel goedkoper had kunnen krijgen. De reden waarom ik ze niet online heb gesteld, wat bijna de helft zou schelen, is dat ik dan zat met een levertijd van meerdere dagen. Dit zou betekenen dat ik niet dit weekend er aan kon werken, maar pas volgend weekend kon beginnen. Ik wist dat ik dit weekend tijd had, maar wie weet wat er volgend weekend op de planning staat. En in plaats van het in een weekendje bouwen, wordt het een van de projecten die je "ooit" "eens" afmaakt "wanneer je tijd hebt". Als dat betekent dat ik 15 euro meer moet betalen voor de switches vind ik dat moeilijk om als minpunt te zien.

## Stap 1: Assembly

Als je dit macro pad in een weekend wilt maken, is de eerste print die je moet aanzetten de top plate. De andere prints kan je later printen, maar zonder de top plate kan je niet beginnen met solderen. Je kan het hele project werkbaar krijgen voordat je de keycaps en de onderkant geprint hebt. Qua print settings, ik heb de behuizing geprint met een 0.6mm nozzle met 0.45mm layer heights, om het zo snel mogelijk klaar te hebben. De keycaps zijn gedaan met een 0.4mm nozzle op 0.16mm layers.

Wanneer de printer klaar is, kan je beginnen met de knoppen in de print te drukken. Let hierbij op dat je ze allemaal hetzelfde erin doet. Bij Cherry MX switches kan je erop letten dat het logo bovenaan staat.

![Foto van de switches in de eerste print](/assets/images/pxl_20220911_160549096.jpg)

Als je dit hebt gedaan, kan je beginnen met het meest tijdrovende werk van het project. De isolatie van de kabels zo knippen dat er steeds een kleine opening is om de kabel aan de switch of de diode te solderen. Na een aantal mislukte pogingen had ik een manier gevonden die makkelijk werkte voor mij. Je begint door eerst een groot deel van de isolatie eraf te strippen. Voor de kollommen deed ik ongeveer 4 cm, voor de rijen ongeveer 2. Het is makkelijker om later draad weg te knippen als je te veel open hebt gelaten dan later extra ruimte vrij te moeten maken. Vervolgens meet je ongeveer de afstand af waar isolatie moet zitten tussen de 1ste en 2de switch en strip je deze. je schuift de isolatie dan naar voren, met nog genoeg ruimte om het uiteinde aan de eerste switch te solderen. Dit herhaal je voor de 2de en 3de switch, tot je uiteindelijk kleine stukjes vrij hebt om alle switches aan de eerste kabel vast te solderen. In deze post ga ik het niet hebben over hoe je moet solderen, want ik ben er ook nog een enorme beginner in.

![Eerste kabel vast gesoldeerd](/assets/images/pxl_20220911_105923973-1-.jpg "Let niet op die ene missende switch, ik ben er een kwijtgeraakt, of de winkel had er maar 23 geteld, beide opties zijn mogelijk.")

Als je de eerste kabel vast hebt, kan je het proces herhalen voor de rest van de kollomen. Voor de rijen kan je er ook voor kiezen om de diodes direct aan elkaar te solderen, maar ik heb ervoor gekozen om er een 2de kabel tussen te laten lopen, zodat er meer isolatie op de kabels zit. Let er goed op de polariteit van je diodes. De 1N4004's hebben een grijze band om aan te geven waar de stroom naartoe loopt. Het maakt niet uit welke kant je kiest, zolang je weet wat wat is, en je bij elke diode dezelfde kant kiest. Als je ze omdraait, werkt het niet.

![Foto van alle kabels en diodes vastgesoldeerd](/assets/images/pxl_20220911_143548036.jpg)

Als laatste soldeerwerk is het nu tijd om alles aan de Pico vast te maken. Belangrijk hier is voornamelijk dat je weet welke rijen en kolommen vast zitten aan welke GPIO pins. Ik heb voor de kolommen GP16, GP17, GP18 en GP 19 gepakt, en voor de rijen GP14 tot en met GP8. Op internet heb ik gelezen dat er problemen zijn met GP15. Ik heb dit niet getest, maar daarom heb ik hem niet gepakt.

![Afbeelding van Pico met alle kabels vast gesoldeerd.](/assets/images/pxl_20220911_160531666.jpg)

En that's it! Nu kunnen we gaan testen of het werkt.

## Stap 2: KMK

Voordat we op knoppen kunnen gaan drukken, moeten we eerst CircuitPython en KMK installeren. Voor de installatie link ik naar [deze video](https://www.youtube.com/watch?v=i43lZPAkA2c) van Craig Manning die stap voor stap uitlegt hoe je KMK op een Pi Pico zet.

Een ding wat de video niet geweldig laat zien, is de volledige code.

### Main.py

```python
print("Starting")

import board

from kmk.kmk_keyboard import KMKKeyboard
from kmk.keys import KC
from kmk.scanners import DiodeOrientation
from kmk.extensions.media_keys import MediaKeys
from kmk.modules.layers import Layers
from kmk.handlers.sequences import send_string

keyboard = KMKKeyboard()
keyboard.extensions.append(MediaKeys())
keyboard.modules.append(Layers())

keyboard.row_pins = (board.GP8, board.GP9, board.GP12, board.GP13, board.GP14, board.GP11)
keyboard.col_pins = (board.GP16, board.GP17, board.GP18, board.GP19)
keyboard.diode_orientation = DiodeOrientation.COL2ROW # From Column to Rows, if you switch the polarity, it's ROW2COL

# Cleaner key names
_______ = KC.TRNS   # Transparent   -> Clicks through to previous layer
XXXXXXX = KC.NO     # No Action     -> Stops click through

FnKey = KC.MO(1)

VIDEO = send_string("https://www.youtube.com/watch?v=dQw4w9WgXcQ") # Very important video

keyboard.keymap = [
    # Base Layer
    [
        KC.AUDIO_MUTE,  KC.LCTL(KC.V),	KC.BRIU,    KC.AUDIO_VOL_UP, \
        FnKey,          KC.LCTL(KC.C),	KC.BRID,    KC.AUDIO_VOL_DOWN,\
      
        KC.N7,		KC.N8,		KC.N9,	    KC.BSPACE,\
        KC.N4,		KC.N5,		KC.N6,	    KC.ASTERISK,\
        KC.N1,		KC.N2,		KC.N3,	    KC.PLUS,
        KC.N0,		KC.DOT,		KC.EQUAL,   KC.ENTER,\
     ],
    
    # Fn Layer
    [
        XXXXXXX,	VIDEO,	    	XXXXXXX,    XXXXXXX, \
        _______,	XXXXXXX,	XXXXXXX,    XXXXXXX,\
      
        _______,	_______,	_______,    KC.DELETE,\
        _______,	_______,	_______,    KC.SLASH,\
        _______,	_______,	_______,    KC.MINUS,
        _______,	KC.COMMA,	_______,    _______,\
     ],
]

if __name__ == '__main__':
    keyboard.go()
```

### Boot.py

```python
import supervisor
import board
import digitalio
import storage
import usb_cdc
import usb_hid

# This is from the base kmk boot.py
supervisor.set_next_stack_limit(4096 + 4096)

# If this key is held during boot, don't run the code which hides the storage and disables serial
# To use another key just count its row and column and use those pins
# You can also use any other pins not already used in the matrix and make a button just for accesing your storage
#
# GP16 <-> GP9 is our Fn key. if yours maps to different ports, update it here. Else you won't be able to update
# your firmware anylonger.
col = digitalio.DigitalInOut(board.GP16)
row = digitalio.DigitalInOut(board.GP9)

# TODO: If your diode orientation is ROW2COL, then make row the output and col the input
col.switch_to_output(value=True)
row.switch_to_input(pull=digitalio.Pull.DOWN)

if not row.value:
    storage.disable_usb_drive()
    # Equivalent to usb_cdc.enable(console=False, data=False)
    usb_cdc.disable()
    usb_hid.enable(boot_device=1)

row.deinit()
col.deinit()
```

Als je deze stappen hebt gevolgd, zou nu je zelfgemaakte macro pad moeten werken!

## Stap 3: Finishing touches

Als het goed is heb je nu een werkende macro pad. Als geen enkele toets werkt, check of je diodes de goede kant op staan en dat je code juist is, en je de juiste GPIO pins hebt ingesteld. Ook kan je met een multimeter checken of de kabels wel aansluiten. Zo niet, weet je dat er ergens een fout hebt gemaakt tijdens het solderen, zo wel, ligt het waarschijnlijk aan de code.

Ik hoop dat je in de tussentijd niet bent vergeten die laatste prints aan te zetten? Jawel? Kom dan na een paar uur maar weer terug... Ah, je bent er weer? Mooi. Nu moeten we alleen nog de onderkant vast maken. In de modellen heb ik ruimte gelaten voor 8 threaded inserts, maar je hebt eigen lijk alleen de 4 hoeken nodig. Je kan nooit te veel plekken voor schroeven hebben, want als je ze niet nodig hebt, draai je ze er gewoon niet in, zoals we hier hebben gedaan. Als laatste heb ik er nog wat vilt stickers op geplakt, zodat de keypad minder rond schuift op het bureau.

![Afbeelding van de achterkant](/assets/images/pxl_20220916_194802122.jpg)

Als je er een maakt, stuur me een foto door! Het beste kan je dat doen door het als "Make" te uploaden naar Printables, of anders me een berichtje te sturen via LinkedIn. Veel bouw plezier!

## Extra info

* [KMK docs](https://github.com/KMKfw/kmk_firmware)
* [Zack Freedman - How To Build A Mechanical Keyboard](https://www.youtube.com/watch?v=yYcNi9hKxDk)