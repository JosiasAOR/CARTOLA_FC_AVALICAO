describe('Sistema  deve', () => {
  it('Exibir a home ', () => {
      cy.visit('http://localhost:5173/')
  })

  it('selecionar o time', () => {
      cy.visit('http://localhost:5173/')
      cy.get('.link').eq(0).click();
  })
  
  
})