var games = ["Animal Crossing: New Horizons", "Assassin’s Creed: Valhalla", "Astro’s Playroom", "Bugsnax", "CoD: Black Ops Cold War", "Crusader Kings III", "Deep Rock Galactic", "Demon Souls", "Dirt 5", "DOOM Eternal", "Dreams", "F1 2020", "Fall Guys", "Final Fantasy VII Remake", "Genshin Impact", "Ghost of Tsushima ", "Hades", "Half-Life: Alyx", "Kentucky Route Zero TV Edition", "Mafia: Definitive Edition", "Marvel’s Avengers", "Microsoft Flight Simulator", "Miles Morales", "Nioh 2", "Ori and the Will of the Wisps", "Persona 5 Royal ", "Pistol Whip", "Resident Evil 3", "Risk of Rain 2", "Satisfactory", "Spelunky 2", "Star Wars: Squadrons", "The Last of Us, Part II", "Tony Hawk Pro Skater 1 and 2", "Wasteland 3", "Watch_Dogs: Legion", "Xenoblade Chronicles: Definitive Edition", "Yakuza: Like a Dragon"]

var connection = require("./config/connection.js");

for(let i = 0; i < games.length; i++){
    connection.query("INSERT INTO games (gameName, votes) VALUES (?, 0);", [games[i]], function (err, result) {
        if (err) {
            throw err;
        }
    });
}
