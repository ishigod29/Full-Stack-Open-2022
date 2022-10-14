describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'Michell Castillo',
      username: 'Michell29',
      password: 'fullstack'
    }
    const user2 = {
      name: 'Matti luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user1)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login User',function(){

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Michell29')
      cy.get('#password').type('fullstack')
      cy.get('#login-button').click()

      cy.contains('Michell Castillo logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Michell29')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'background-color', 'rgb(200, 100, 100)')

      cy.get('html').should('not.contain', 'Michell Castillo logged in')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Michell29', password: 'fullstack' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('testing app by cypress')
      cy.get('#author').type('Michell Castillo')
      cy.get('#url').type('https://blog.la.leng.com')
      cy.get('#create-button').click()

      cy.contains('testing app by cypress')
    })

    it('user can like publications', function(){
      cy.createBlog({
        title: 'testing likes button',
        author: 'Michell Castillo',
        url: 'https://google.com'
      })
      cy.contains('view').click()
      cy.get('#like-button').click()
      cy.contains('likes 1')
    })

    it('user can deleted publications', function(){
      cy.createBlog({
        title: 'testing likes button',
        author: 'Michell Castillo',
        url: 'https://google.com'
      })
      cy.contains('view').click()
      cy.get('.b_remove').click()

      cy.contains('testing likes button is removed')
    })

    describe('blogs are ordered by the number of likes', function(){
      beforeEach(function(){
        cy.login({ username: 'Michell29', password: 'fullstack' })
        cy.createBlog({ title: 'test cypress 1', author: 'Michell Castillo', url:'https://google.com' })
        cy.createBlog({ title: 'test cypress 2', author: 'Michell Castillo', url:'https://google.com' })
        cy.createBlog({ title: 'test cypress 3', author: 'Michell Castillo', url:'https://google.com' })

        cy.contains('test cypress 1').parent().as('blog1')
        cy.contains('test cypress 2').parent().as('blog2')
        cy.contains('test cypress 3').parent().as('blog3')
      })

      it('order number of likes', function(){
        cy.get('@blog1').contains('view').click()
        cy.get('@blog2').contains('view').click()
        cy.get('@blog3').contains('view').click()
        cy.get('@blog1').contains('like').as('like1')
        cy.get('@blog2').contains('like').as('like2')
        cy.get('@blog3').contains('like').as('like3')

        cy.get('@like2').click()
        cy.wait(1000)
        cy.get('@like1').click()
        cy.wait(1000)
        cy.get('@like1').click()
        cy.wait(1000)
        cy.get('@like3').click()
        cy.wait(1000)
        cy.get('@like3').click()
        cy.wait(1000)
        cy.get('@like3').click()
        cy.wait(1000)

        cy.get('.items').then(blogs => {
          cy.wrap(blogs[0]).contains('3')
          cy.wrap(blogs[1]).contains('2')
          cy.wrap(blogs[2]).contains('1')
        })
      })


    })
  })
})