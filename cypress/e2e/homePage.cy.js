/// <reference types="cypress" />


describe('Página inicial', () => {
  beforeEach(() => {
    cy.visit('https://metas-diarias.vercel.app/');
    
    cy.viewport('iphone-x')
  });

  it('Deve exibir o formulário de login', () => {
    cy.get('#login-form').should('be.visible')
  });

  it('Deve conter um campo de usuário digitável', () => {
      cy.contains('Usuário').should('be.visible')
      cy.get('#username').should('not.have.value').type('Teste').should('have.value', 'Teste')
  });

  it('Deve conter um campo de senha digitável', () => {
    cy.contains('Senha').should('be.visible')
    cy.get('#password').should('not.have.value').type('Teste').should('have.value', 'Teste')
  });

  it('Deve conter um botão de Login', () => {
      cy.contains('Login').should('be.visible')
  });

  it('Deve conter um botão de Logout após login efetuado', () => {
    cy.get('#username').type('teste')
    cy.get('#password').type('teste')
    cy.get('#login-button').should('be.visible').click()

    cy.contains('Logout').should('be.visible')
  });

  it('Deve redirecionar para a página "createAccount.html" ao clicar em "Crie sua conta"', () => {
    cy.get('.login-form').contains('Crie sua conta').click()
    cy.url().should('include', 'createAccount.html')
  });

  it('Deve exibir a página "campanha.html" ao clicar no botão "Campanha"', () => {
    cy.get('.campaign-button').click()
    cy.url().should('include', 'campanha.html')
  });

  it('Deve exibir o modal de doação ao clicar no botão "Doação"', () => {
    cy.get('#donate-button').click()
    cy.get('#donation-modal').should('be.visible')
  });

  it('Deve ser possível copiar o código PIX aleatório do botão "Doação"', () => {
    cy.get('#donate-button').click()
    cy.get('#donation-modal-copy-button').should('be.visible').click()
  });
});
