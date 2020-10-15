// ./test/.. test.js luodaan erilaisia testejä, jossa testataan ../utils/.. funktioita
// test(x, y) ottaa kaksi parametria , x = merkkijonokuvaus testistä, y = on funktio,
// joka määrittelee testitapauksen toiminnallisuuden

// npm install --save-dev jest

const list_helper = require('../utils/list_helper')

// describe (ei pakollinen) on lohko, joka auttaa erottamaan testit
describe('total likes test', () => {
    
    test('array of many blogs', () => {
        const blogs = [ 
            { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
            { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
            { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 },
            { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
            { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
            { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
        ]
        const result = list_helper.totalLikes(blogs)

        expect(result).toBe(36)
    })

    test('array of one blog', () => {
        const blogs = [ 
            { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
        ]
        const result = list_helper.totalLikes(blogs)

        const dd = blogs.find(a => a)
        //console.log('ddd-->', dd);

        expect(result).toBe(dd.likes)
    })
/*
    test('array of none blog', () => {
        const blogs = []
        const result = list_helper.totalLikes(blogs)

        const dd = blogs.find(a => a)
        //console.log('ddd-->', dd);

        expect(result).toBe(dd.likes)
    })
*/
})

// describe (ei pakollinen) on lohko, joka auttaa erottamaan testit
describe('the most likes in blog', () => {
    
    test('array of many blogs', () => {
        const blogs = [ 
            { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
            { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
            { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 },
            { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
            { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
            { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
        ]
        const result = list_helper.favoriteBlog(blogs)

        expect(result).toEqual({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
          })
    })
})


// 4.3 - 