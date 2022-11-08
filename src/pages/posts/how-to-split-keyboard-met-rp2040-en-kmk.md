---
title: "How To: Split Keyboard met RP2040 en KMK"
permalink: /posts/how-to-split-keyboard-met-rp2040-en-KMK
englishLink: /en/posts/how-to-split-keyboard-on-rp2040-with-KMK
description: Description
publishDate: 2022-11-06T20:00:00.969Z
layout: ../../layouts/blog-layout.astro
---
In mijn vorige blogpost heb ik uitgelegd hoe ik [mijn macropad](/posts/3d-printed-hand-wired-macro-pad-met-raspberry-pi-pico-kmk-circuitpython) heb gemaakt. In die post hintte ik dat een split keyboard wil maken, specifiek de Redox v1, maar dat heb ik niet gedaan. Ik heb niet een split keyboard gemaakt, ik heb er ondertussen al 2 gemaakt.

![Finished Redox Split keyboard](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto,w_1024/v1667748697/Redox%20Finished.jpg)

De eerste versie van mijn keyboard kon niet los van elkaar gemaakt worden. De rijen en kolommen zijn direct aan elkaar gesoldeerd met 12 kabels die buiten de case om gaan, zoals je kan zien op de foto hieronder. Ik heb hiervoor gekozen omdat de documentatie om een RP2040-based microcontroller, zoals de Raspberry Pi Pico, te gebruiken als een split keyboard extreem onduidelijk was. Voor de eerste versie was het vooral belangrijk dat ik snel op een toetsenbord kon typen en kon wennen aan de nieuwe layout.

![Eerste Redox met een cable mess](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto,w_1024/v1667750007/My%20Redox%20v1.jpg)

## Bill of Materials

Om alles te maken heb ik gebruik gemaakt van de Laser cutter van de [Maakplek](https://www.maakplek.nl/) en mijn 3d printer. Als je alleen een 3d printer hebt, kan je de gelinkte modellen gebruiken die ik als "Case" heb toegevoegd, en eerlijk, ik zou het aanraden om de bovenste plaat ook te printen. Met een laser kan je niet de indents maken die nodig zijn voor de Choc switches om goed vast te pakken, waardoor sommige keys nogal los zitten.

| Components                                                                                                                        | Price             |
| --------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| [70x switches](https://splitkb.com/products/kailh-low-profile-choc-switches?variant=39459382394957)                               | €34,21            |
| [70x diodes](https://www.okaphone.com/artikel.asp?id=448925)                                                                      | €5,- /100         |
| [2x Jackplug TRRS mount](https://www.okaphone.com/artikel.asp?id=492879)                                                          | €8,90             |
| [TRRS cable](https://splitkb.com/products/coiled-angled-trrs-cable)                                                               | €5,95             |
| [24 AWG single-core and stranded wires](https://www.okaphone.com/artikel.asp?id=476323)                                           | €5ish             |
| [2x RP2040 based microcontrollers](https://www.kiwi-electronics.com/nl/raspberry-pi-pico-10494)                                   | €9,00             |
| [Legended MBK Choc Low Profile Keycaps (alpha)](https://splitkb.com/products/mbk-choc-low-profile-keycaps?variant=33283834937421) | €29,85            |
| [Legended MBK Choc Low Profile Keycaps (mods)](https://splitkb.com/products/mbk-choc-low-profile-keycaps?variant=33283835068493)  | €31,94            |
| [Case](https://www.thingiverse.com/thing:4634895)                                                                                 | ¯⁠\⁠⁠(⁠ ツ ⁠)⁠⁠/⁠¯ |
| [Threaded Inserts set - 10x M3, 4x M5](https://www.amazon.nl/CNC-Kitchen-original-threaded-inserts/dp/B09CL4KY59/)                |                   |
| **Total**                                                                                                                         | **€129,85**       |

## Wiring Diagram



```python
print("Starting")

import board

from kmk.kmk_keyboard import KMKKeyboard
from kmk.keys import KC
from kmk.scanners import DiodeOrientation
from kmk.modules.split import Split, SplitType, SplitSide
from kmk.modules.layers import Layers
from kmk.extensions.RGB import RGB, AnimationModes

keyboard = KMKKeyboard()

keyboard.col_pins = (board.GP16,)
keyboard.row_pins = (board.GP14,)
keyboard.diode_orientation = DiodeOrientation.COL2ROW

keyboard.modules.append(Layers())

rgb = RGB(pixel_pin=board.GP3, num_pixels=14)
rgb.animation_mode = AnimationModes.BREATHING_RAINBOW
keyboard.extensions.append(rgb)

# Using drive names (KYRIAL, KYRIAR) to recognize sides; use split_side arg if you're not doing it
split = Split(split_type=SplitType.UART, split_side=SplitSide.LEFT, data_pin=board.GP0, data_pin2=board.GP1, use_pio=True, uart_flip = True)
#split = Split(split_type=SplitType.UART, split_side=SplitSide.RIGHT, data_pin=board.GP0, data_pin2=board.GP1, use_pio=True, uart_flip = True)
keyboard.modules.append(split)

keyboard.row_pins = (board.GP20, board.GP19, board.GP18, board.GP17, board.GP16)
keyboard.col_pins = (board.GP12, board.GP11, board.GP10, board.GP9, board.GP8, board.GP7, board.GP6)
keyboard.diode_orientation = DiodeOrientation.COL2ROW

# Cleaner key names
_______ = KC.TRNS
XXXXXXX = KC.NO

FnKey = KC.MO(1)

keyboard.keymap = [
    # Base Layer
    [
        # COL GP28		COL GP27	COL GP26	COL GP22	COL GP21	COL GP20	COL GP19	<>	COL GP18		COL GP17	COL GP16	COL GP14	COL GP13	COL GP12	COL GP11
        KC.ESCAPE,		KC.N1,		KC.N2,		KC.N3,		KC.N4,		KC.N5,		KC.EQUAL, 		KC.MO(1),		KC.N6,		KC.N7,		KC.N8,		KC.N9,		KC.N0,		KC.MO(2),\
        KC.MEH,			KC.Q,		KC.W,		KC.E,		KC.R,		KC.T,		KC.LBRACKET, 	KC.RBRACKET,	KC.Y,		KC.U,		KC.I,		KC.O,		KC.P,		KC.MINUS,\
        KC.TAB,			KC.A,		KC.S,		KC.D,		KC.F,		KC.G,		XXXXXXX, 		XXXXXXX,		KC.H,		KC.J,		KC.K,		KC.L,		KC.SCOLON,	KC.QUOTE,\
        KC.LSHIFT,		KC.Z,		KC.X,		KC.C,		KC.V,		KC.B,		KC.LALT, 		KC.MO(2),		KC.N,		KC.M,		KC.COMMA,	KC.DOT,		KC.SLASH,	KC.RSHIFT,\
        KC.LGUI,		KC.GRV,		KC.BSLASH,	KC.LALT,	KC.LCTRL,	KC.SPACE,	KC.MO(1),	 	KC.ENTER,		KC.BSPACE,	KC.MO(2),	KC.LEFT,	KC.RIGHT,	KC.UP,		KC.DOWN,\
     ],
    
    # M1 Layer
    [
        # COL GP28		COL GP27	COL GP26	COL GP22	COL GP21	COL GP20	COL GP19	<>	COL GP18		COL GP17	COL GP16			COL GP15	COL GP14			COL GP13	COL GP12
        _______,		KC.F1,		KC.F2,		KC.F3,		KC.F4,		KC.F5,		KC.F6,			_______,		KC.F7,		KC.F8,				KC.F9,		KC.F10,				KC.F11,		KC.F12, \
        _______,		KC.EXLM,	KC.AT,		KC.HASH,	KC.DOLLAR,	KC.PERCENT,	_______, 		_______,		_______,	KC.LALT(KC.LEFT),	KC.UP,		KC.LALT(KC.RIGHT),	_______,	_______, \
        _______,		KC.N1,		KC.N2,		KC.N3,		KC.N4,		KC.N5,		XXXXXXX, 		XXXXXXX,		_______,	KC.LEFT,			KC.DOWN,	KC.RIGHT,			_______,	_______, \
        _______,		_______,	_______,	_______,	_______,	_______,	_______,    	_______,    	_______,	_______,			_______,    _______,			_______,	_______, \
        _______,		_______,	_______,	_______,	_______,    _______,    _______,	 	_______,		_______,    _______,    		_______,    _______,    		_______,	_______, \
     ],
    
    # M2 Layer
    [
        # COL GP28		COL GP27	COL GP26	COL GP22	COL GP21	COL GP20	COL GP19	<>	COL GP18		COL GP17	COL GP16	COL GP15	COL GP14	COL GP13	COL GP12
        _______,		_______,	_______,	_______,	_______,	_______,	_______, 		_______,		_______,	_______,	_______,	_______,	_______,	_______, \
        _______,		_______,	_______,	_______,	_______,	_______,	_______, 		_______,		KC.CIRC,	KC.AMPR,	KC.ASTR,	KC.LPRN,	KC.RPRN,	_______, \
        _______,		_______,	_______,	_______,	_______,	_______,	XXXXXXX, 		XXXXXXX,		KC.N6,		KC.N7,		KC.N8,		KC.N9,		KC.N0,		_______, \
        _______,		_______,	_______,	_______,	_______,	_______,	_______,    	_______,    	_______,	_______,	_______,    _______,	_______,	_______, \
        _______,		_______,	_______,	_______,	_______,    _______,    _______,	 	_______,		_______,    _______,    _______,    _______,    _______,	_______, \
     ],
]



if __name__ == '__main__':
    keyboard.go()

```