describe('Blog app', function() {
  beforeEach(function() {
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

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('vaara-tunnus')
      cy.get('#password').type('viela-vaarempi-salasana')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })


  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.contains('create')
      cy.get('#title').type('a note created by cypress')
      cy.get('#author').type('some author')
      cy.get('#url').type('https://yle.fi')
      cy.get('#create-button').click()
      cy.contains('a note created by cypress')
    })

    it('A blog can be liked', function() {
      cy.contains('new blog').click()
      cy.contains('create')
      cy.get('#title').type('a note created by cypress')
      cy.get('#author').type('some author')
      cy.get('#url').type('https://yle.fi')
      cy.get('#create-button').click()
      cy.wait(1000)
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })
  })

})