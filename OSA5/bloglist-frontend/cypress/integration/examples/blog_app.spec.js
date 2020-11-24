// front (npm start) ja end (npm run start:test) päälle
// cypress test-run avataan komennolla "npm run cypress:open" tai "npm run test:e2e" <-- viimeinene on terminaali (non UI) testi
// tulee uusi ikkuna, jossa tehdään testit

// testit voidaan suorittaa myös yksittäin "it.only()"

describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
          name: 'Juho Kemppainen',
          username: 'juhokem',
          password: 'salasana'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user) // luodaan uusi käyttäjä
      cy.visit('http://localhost:3000')
    })
    // kirjautmislomakkeen näyttö
    it('Login form is shown, 5.17', function() {
        cy.contains('Login')
        cy.contains('Username')
        cy.contains('Password')
        
    })
    // kirjautuminen
    describe('Login', function () {
        it('Login succeeded, 5.18', function() {
            cy.get('#username').type('juhokem')
            cy.get('#password').type('salasana')
            cy.get('#login-button').click()
    
            cy.contains('Juho Kemppainen logged in')
            
        })
        // kirjautuminen väärillä tunnuksilla
        it('Login failed, 5.18', function () {
            cy.get('#username').type('juhokem')
            cy.get('#password').type('wrongpassword')
            cy.get('#login-button').click()
    
            // varmistaa, että Notification on oikea ja väri punainen
            cy.contains('Wrong username or password')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')

        })
    })
    // kirjautuminen UI:n ohi
    Cypress.Commands.add('login', ({ username, password }) => {
        cy.request('POST', 'http://localhost:3001/api/login', {
          username, password
        }).then(({ body }) => {
          localStorage.setItem('loggedUser', JSON.stringify(body))
          cy.visit('http://localhost:3000')
        })
    })

    // uuden blogin luominen
    Cypress.Commands.add('createBlog', ({ content, important }) => {
        cy.request({
          url: 'http://localhost:3001/api/blogs',
          method: 'POST',
          body: { title, author, url },
          headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
          }
        })
      
        cy.visit('http://localhost:3000')
      })

    // uuden blogin manipulointi
    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'juhokem', password: 'salasana' })
    
              //cy.get('#username').type('juhokem')
              //cy.get('#password').type('salasana')
              //cy.get('#login-button').click()
            //cy.contains('Juho Kemppainen logged in')
        })

        // blogin lisäys
        it('A blog can be created, 5.19', function () {
            cy.get('#newBlogButton').click()

            cy.get('#inputTitle').type('cypress E2E-test')
            cy.get('#inputAuthor').type('Jack Russell')
            cy.get('#inputUrl').type('www.succeeded.com')
            cy.get('#createNewBlogButton').click()

            cy.get('.error').should('contain', 'cypress E2E-test by Jack Russell added')
        })

        // tykkääminen
        it('A blog can be liked, 5.20', function () {
            cy.get('#newBlogButton').click()

            cy.get('#inputTitle').type('cypress E2E-test')
            cy.get('#inputAuthor').type('Jack Russell')
            cy.get('#inputUrl').type('www.succeeded.com')
            cy.get('#createNewBlogButton').click()

            cy.get('.error').should('contain', 'cypress E2E-test by Jack Russell added')

            cy.get('#showBlog').click()
            cy.get('#likes').should('contain', 'likes 0')

            cy.get('#likeButton').click()
            cy.get('#likes').should('contain', 'likes 1')
        })

        // blogin poisto
        it('A blog can be removed, 5.21', function () {
            cy.get('#newBlogButton').click()

            cy.get('#inputTitle').type('cypress E2E-test')
            cy.get('#inputAuthor').type('Jack Russell')
            cy.get('#inputUrl').type('www.succeeded.com')
            cy.get('#createNewBlogButton').click()

            cy.get('.error').should('contain', 'cypress E2E-test by Jack Russell added')

            cy.get('#showBlog').click()
            cy.get('#removeButton').click()

        })

        // kolmen blogin lisäys ja järjestyksen tsekkaus
        it('Likes in descending order, 5.22', function () {
            cy.get('#newBlogButton').click()

            // #1
            cy.get('#inputTitle').type('first cypress E2E-test')
            cy.get('#inputAuthor').type('Jack Russell')
            cy.get('#inputUrl').type('www.succeeded.com')
            cy.get('#createNewBlogButton').click()

            // #2
            cy.get('#inputTitle').type('second cypress E2E-test')
            cy.get('#inputAuthor').type('Matti Meikäläinen')
            cy.get('#inputUrl').type('www.xox.com')
            cy.get('#createNewBlogButton').click()

            cy.wait(5000) // jotta notificaatio häviäisi
            cy.contains('Matti Meikäläinen').contains('Show').click()
            cy.contains('like').click()

            // #3
            cy.get('#inputTitle').type('third cypress E2E-test')
            cy.get('#inputAuthor').type('Kimi')
            cy.get('#inputUrl').type('www.tra.com')
            cy.get('#createNewBlogButton').click()

            cy.wait(6000) // jotta notificaatio häviäisi
            cy.contains('Kimi').contains('Show').click()
            cy.contains('likes 0').contains('like').click().click()

            cy.contains('Jack Russell').contains('Show').click()


            cy
                .get('.blogsLikes')
                .then(blogs => {
                //console.log('lenght of array', blogs.length)
                //console.log('lenght of array', blogs[0])
                
                expect(blogs[0]).to.contain.text('likes 2')
                expect(blogs[1]).to.contain.text('likes 1')
                expect(blogs[2]).to.contain.text('likes 0')
              })

        })

    })

})