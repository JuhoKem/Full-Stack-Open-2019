// ./test/.. test.js luodaan erilaisia testejä, jossa testataan ../utils/.. funktioita
// test(x, y) ottaa kaksi parametria , x = merkkijonokuvaus testistä, y = on funktio,
// joka määrittelee testitapauksen toiminnallisuuden

// npm install --save-dev jest

const listHelper = require('../utils/list_helper')

test('dummy returns 1', () => {
  const blogs = []

  // otetaan muuttujaan arvo, se saadaan funktiosta, jonka mukana välitetään tyhjä taulukko
  const result = listHelper.dummy(blogs)

  // except() määrittää toiminnallisuuden - onko esim. vertailu tai muu operaatio
  expect(result).toBe(1)
})


// 4.3 - 