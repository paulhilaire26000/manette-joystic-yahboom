input.onButtonPressed(Button.A, function () {
    manette.vibrate_the_gamepad(Gamepadvibration.on)
    basic.pause(100)
    manette.vibrate_the_gamepad(Gamepadvibration.off)
})
input.onButtonPressed(Button.B, function () {
    manette.vibrate_the_gamepad(Gamepadvibration.on)
    basic.pause(2000)
    manette.vibrate_the_gamepad(Gamepadvibration.off)
    manette.vibrate_the_gamepad_time(Gamepadvibrationtime.long)
})
