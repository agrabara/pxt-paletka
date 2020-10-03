/**
 * prawa część paletki
 */
/**
 * Gra z drugich zajęć CoderDojo-Micto:bit zdalnie 2020.04.18 obecni: Michalina, Maks, Rafał, Michał
 * 
 * PONG
 * 
 * 1. sterowanie paletką A/B - lewo/prawo
 * 
 * 2. odbijamy piłkę
 * 
 * 3. piłka porusza się po ekranie
 * 
 * 4. odbijając się sufitu i paletki - rykoszetuje
 * 
 * 4. co 3 odbicia  (reszta z dzielenia), prędkość piłki przyspiesza ;-) aby było trudniej
 * 
 * 5. liczymy ile razy udało się "odbić"
 */
input.onButtonPressed(Button.A, function () {
    if (paletkaA.get(LedSpriteProperty.X) > 0) {
        // lewa część paletki w prawo
        paletkaA.change(LedSpriteProperty.X, -1)
        // prawa część paletki w prawo
        paletkaB.change(LedSpriteProperty.X, -1)
    }
})
input.onButtonPressed(Button.B, function () {
    // przesuwamy paletkę w lewo - aż do lewej krawędzi
    if (paletkaB.get(LedSpriteProperty.X) < 4) {
        // lewa część paletki w lewo
        paletkaA.change(LedSpriteProperty.X, 1)
        // prawa część paletki w lewo
        paletkaB.change(LedSpriteProperty.X, 1)
    }
})
/**
 * lewa część paletki
 */
let wynik = 0
let paletkaB: game.LedSprite = null
let paletkaA: game.LedSprite = null
basic.showString("PONG!")
basic.pause(500)
// zaczynamy z piłką - ruch co sekundę
let pauza = 1000
// kierunek ruchu piłki -1,0,1 lewo, pionowo, prawo
let dirX = 1
// kierunek ruchu piłki -1,0,1 góra, poziomo, dół
let dirY = 1
// piłka w lewym górnym rogu
let pilka = game.createSprite(0, 0)
// jasność piłeczki
pilka.set(LedSpriteProperty.Brightness, 150)
// paletka - lewa część na dole ekranu
paletkaA = game.createSprite(1, 4)
// paletka - prawa część na dole ekranu
paletkaB = game.createSprite(2, 4)
// paletka - prawa część na dole ekranu
basic.pause(500)
basic.forever(function () {
    // ruch paletki X - w poziomie
    pilka.change(LedSpriteProperty.X, dirX)
    // ruch paletki Y - w pionie
    pilka.change(LedSpriteProperty.Y, dirY)
    if (pilka.isTouching(paletkaA) || pilka.isTouching(paletkaB)) {
        // zmienia kierunek ruchu z poziomie (mnożenie przez -1)
        pilka.change(LedSpriteProperty.X, dirX * -1)
        // i odbija się "w górę"
        dirY = -1
        // ruch paletki (na pewno w górę)
        pilka.change(LedSpriteProperty.Y, dirY)
        // rykoszetujemy - losujemy w którą stronę w poziomie się odbija
        dirX = Math.randomRange(-1, 1)
        // zwiększamy wynik
        wynik += 1
        if (wynik % 3 == 0) {
            // co 3 odbicia przyspieszamy
            pauza += -100
            // efekt fajerwerków
            game.addScore(1)
        }
    }
    if (pilka.get(LedSpriteProperty.Y) >= 4) {
        // ustawiamy wynik gry
        game.setScore(wynik)
        // koniec gry
        game.gameOver()
    } else if (pilka.get(LedSpriteProperty.Y) <= 0) {
        // odbija się - na pewno w dół
        dirY = 1
        // rykoszetujemy - losowanie czy w lewo, prawo czy pionowo w dół
        dirX = Math.randomRange(-1, 1)
    }
    basic.pause(pauza)
})
