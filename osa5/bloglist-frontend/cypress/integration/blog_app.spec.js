describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    const user2 = {
      name: 'Akira Taguchi',
      username: 'akirataguchi115',
      password: 'einiinsalainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('vaara-tunnus')
      cy.get('#password').type('viela-vaarempi-salasana')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })


  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.contains('create')
      cy.get('#title').type('a note created by cypress')
      cy.get('#author').type('some author')
      cy.get('#url').type('https://yle.fi')
      cy.get('#create-button').click()
      cy.contains('a note created by cypress')
    })

    it('A blog can be liked', function () {
      cy.contains('new blog').click()
      cy.contains('create')
      cy.get('#title').type('a note created by cypress')
      cy.get('#author').type('some author')
      cy.get('#url').type('https://yle.fi')
      cy.get('#create-button').click()
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('A blog can be removed by owner', function () {
      cy.contains('new blog').click()
      cy.contains('create')
      cy.get('#title').type('a note created by cypress')
      cy.get('#author').type('some author')
      cy.get('#url').type('https://yle.fi')
      cy.get('#create-button').click()
      cy.contains('logout').click()
      cy.get('#username').type('akirataguchi115')
      cy.get('#password').type('einiinsalainen')
      cy.get('#login-button').click()
      cy.contains('remove').should('not.exist')
      cy.contains('logout').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.wait(3000)
      cy.contains('a note created by cypress').should('not.exist')
    })

    it('Added blogs are in like order', function () {
      //Create blogs
      cy.contains('new blog').click()
      cy.get('#title').type('a note created by cypress')
      cy.get('#author').type('some author')
      cy.get('#url').type('https://yle.fi')
      cy.get('#create-button').click()
      cy.get('#title').type('another note')
      cy.get('#author').type('another author')
      cy.get('#url').type('https://secondurl.com')
      cy.get('#create-button').click()
      cy.get('#title').type('third note')
      cy.get('#author').type('third author')
      cy.get('#url').type('https://thirdurl.com')
      cy.get('#create-button').click()

      //Like blogs
      cy.wait(2000)
      cy.contains('a note created by cypress').contains('view').click()
      cy.contains('another note').contains('view').click()
      cy.contains('third note').contains('view').click()
      cy.contains('a note created by cypress')
        .parent()
        .contains('like')
        .click()
        .wait(500)
        .click()
      cy.contains('another note')
        .parent()
        .contains('like')
        .click()
        .wait(500)
        .click()
        .wait(500)
        .click()
        .wait(500)
        .click()
        .wait(500)
        .click()
        .wait(500)
        .click()
        .wait(500)
        .click()
      cy.contains('third note')
        .parent()
        .contains('like')
        .click()
        .wait(500)
        .click()
        .wait(500)
        .click()
        .wait(500)
        .click()
        .wait(500)
        .click()

      //Test if sorted
      cy.get('#blogs>div').each(($element, index) => {
        cy.get($element)
          .find('.togglableContent')
          .find('#likeamount').then(($element) => {
            if (index === 0) {
              cy.wrap($element).contains('7')
            } else if (index === 1) {
              cy.wrap($element).contains('5')
            } else if (index === 2) {
              cy.wrap($element).contains('2')
            }
          })
      })
    })
  })
})