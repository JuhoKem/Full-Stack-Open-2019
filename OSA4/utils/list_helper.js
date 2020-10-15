
// utils/... luodaan yksikkötestejä ja määritellään funtioita.
// Exportataan, jotta voidaan ottaa käyttöön ../test/..test.js hakemistossa

// dummy-funktio, jolla voi testata toimivuutta
const dummy = (blogs) => {

   return 1
}

// laskee yhteenlaskettujen tykkäysten määrän blogitaulukosta
const totalLikes = (blogs) => {

    // reducessa on kaksi parametria (laskufunktio, aloitusarvo)
    // a on joka kierroksen jälkeen akkumumulattivine arvo ja b on uuden objektin arvo
    const result = blogs.reduce((a, b) => a + b.likes, 0)
    //console.log('TOTAL LIKES: ----->', result);

    return result
}

// selvittää, millä blogilla on eniten tykkäyksiä
const favoriteBlog = (blogs) => {

    // vertaillaan taulukossa olevien objektien tykkäysten määrää. Iteroidaan taulukko läpi ja valitaan isoin arvo
    const reducer = blogs.reduce((max, next) => next.likes > max ? next.likes : max , 0)

    // kun isoin arvo on tiedossa, etsitään isoimman arvon perusteella objekti blogi-taulukossa
    const biggest = blogs.find(a => a.likes === reducer)

    // luodaan objekti, johon otetaan kiinnostavat kentät mukaan
    const result = {title: biggest.title, author: biggest.author, likes: biggest.likes}
 
    //console.log('TULOS ON ---->', result);

    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}