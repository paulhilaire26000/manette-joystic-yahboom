
/**
* Utilisez ce fichier pour définir des fonctions et des blocs personnalisés.
* En savoir plus à https://makecode.microbit.org/blocks/custom
*/   
enum GamepadButton {
    //% block="B1"
    B1,
    //% block="B2"
    B2,
    //% block="B3"
    B3,
    //% block="B4"
    B4
}
enum Gamepadvibrationtime {
    //% block="court"
    court,
    //% block="moyen"
    moyen,
    //% block="long"
    long,
}
enum Gamepadaxis {
    //% block="x"
    x,
    //% block="y"
    y,
}
enum Gamepadvibration {
    //% block="on"
    on,
    //% block="off"
    off,
}

/**
 * Custom blocks
 */
//% weight=105 color=#821071 icon="\uf11b"
namespace manette {

    /**
     * Est pressé
     * @param btn Bouton de la manette
     */
    //% block="bouton $btn est pressé"
    export function is_pressed(btn: GamepadButton):boolean {
        if (btn == GamepadButton.B1) {
            pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
            if (pins.digitalReadPin(DigitalPin.P13) == 0)
                return true;
            else
                return false;
        }
        if (btn == GamepadButton.B2) {
            pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
            if (pins.digitalReadPin(DigitalPin.P14) == 0)
                return true;
            else
                return false;
        } 
        if (btn == GamepadButton.B3) {
            pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
            if (pins.digitalReadPin(DigitalPin.P15) == 0)
                return true;
            else
                return false;
        } 
        if (btn == GamepadButton.B4) {
            pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
            if (pins.digitalReadPin(DigitalPin.P16) == 0)
                return true;
            else
                return false;
        }
        return false;
    }
    /**
        * Joystic est pressé
        */
    //% block="bouton joystic est pressé"
    export function joystic_is_pressed(): boolean {
        pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
        if (pins.digitalReadPin(DigitalPin.P8) == 0)
            return true;
        else
            return false;
    }
    /**
     * Joystic
     */
    //% block="position de l'ax $ax du joystic"
    export function get_axis_value(ax :Gamepadaxis) : number {
        let value = 0;
        if (ax == Gamepadaxis.y)
            value = pins.analogReadPin(AnalogReadWritePin.P1)
        if (ax == Gamepadaxis.x)
            value = pins.analogReadPin(AnalogReadWritePin.P2)
        return (((value-512)*100)/512)*-1;
    }

    /**
     * On button pressed
     * @param btn Bouton de la manette
     */
    //% block="Lorsque $btn est pressé"
    export function on_button_pressed(btn: GamepadButton, handler: () => void) {
        control.inBackground(function() {
            let prev = is_pressed(btn);
            while (true) {
                let val = is_pressed(btn);
                if (!val && prev) {
                    handler();
                }
                prev = val;
                pause(20);
            }
        })
    }

    /**
     * On joystic button pressed
     */
    //% block="Lorsque bouton joystic est pressé"
    export function on_joystic_button_pressed(handler: () => void) {
        control.inBackground(function () {
            let prev = joystic_is_pressed();
            while (true) {
                let val = joystic_is_pressed();
                if (!val && prev) {
                    handler();
                }
                prev = val;
                pause(20);
            }
        })
    }
    /**
     * vibration gamepad
     */
    //% block="mettre vibration de la manette à $vbt"
    export function vibrate_the_gamepad (vbt: Gamepadvibration):void{
       if (vbt == Gamepadvibration.on) 
            pins.digitalWritePin(DigitalPin.P0, 0)
        if (vbt == Gamepadvibration.off)
            pins.digitalWritePin(DigitalPin.P0, 1)
    }
    /**
     * vibration gamepad
     */
    //% block="mettre vibration pendant un temps $vbtt"
    export function vibrate_the_gamepad_time(vbtt:Gamepadvibrationtime): void {
        if (vbtt == Gamepadvibrationtime.court) {
            manette.vibrate_the_gamepad(Gamepadvibration.on)
            basic.pause(100)
            manette.vibrate_the_gamepad(Gamepadvibration.off)
        }
        if (vbtt == Gamepadvibrationtime.moyen) {
            manette.vibrate_the_gamepad(Gamepadvibration.on)
            basic.pause(500)
            manette.vibrate_the_gamepad(Gamepadvibration.off)
        }
        if (vbtt == Gamepadvibrationtime.long) {
            manette.vibrate_the_gamepad(Gamepadvibration.on)
            basic.pause(1500)
            manette.vibrate_the_gamepad(Gamepadvibration.off)
        }
    }  
}