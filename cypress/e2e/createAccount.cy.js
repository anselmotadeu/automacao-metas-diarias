describe('Página de criação de conta', () => {
    beforeEach(() => {
      cy.visit('https://metas-diarias.vercel.app/createAccount.html')

      cy.viewport('iphone-x')
    });
  
    it('Deve exibir o formulário de criação de conta', () => {
      cy.get('#create-account-form').should('be.visible')
    });
  
    it('Deve voltar para a página inicial ao clicar no botão "Voltar"', () => {
      cy.get('.back-button').click()
      cy.url().should('include', 'index.html')
    });
  
    it('Deve exibir uma mensagem de sucesso ao preencher o formulário corretamente', () => {
      cy.get('#full-name').type('Teste de Perfil')
      cy.get('#phone').type('1234567890')
      cy.get('#whatsapp-checkbox').click()
      cy.get('#whatsapp-contact-checkbox').click()
      cy.get('#email').type('teste.perfil@example.com')
      cy.get('#church-name').type('My Church')
      cy.get('#password').type('Password@123')
      cy.get('#confirm-password').type('Password@123')
      cy.get('#create-account-form').submit()
      cy.contains('Sua conta foi criada com sucesso!').should('be.visible')
    });

    it('Todos os campos devem estar vazios após a criação de uma conta', () => {
      cy.get('#full-name').should('not.have.value')
      cy.get('#phone').should('not.have.value')
      cy.get('#whatsapp-checkbox').uncheck().should('not.have.value')
      cy.get('#email').should('not.have.value')
      cy.get('#church-name').should('not.have.value')
      cy.get('#password').should('not.have.value')
      cy.get('#confirm-password').should('not.have.value')
    });

    it('Mensgaem de validação quando as senhas divergem', () => {
      cy.get('#full-name').type('Teste de Perfil')
      cy.get('#phone').type('1234567890')
      cy.get('#whatsapp-checkbox').click()
      cy.get('#whatsapp-contact-checkbox').click()
      cy.get('#email').type('teste.perfil@example.com')
      cy.get('#church-name').type('My Church')
      cy.get('#password').type('Password@123')
      cy.get('#confirm-password').type('Password@1234')
      cy.contains('A senha não confere com a senha fornecida acima.').should('be.visible')
    });

    it('Os requisitos para criação da senha devem ser visíveis', () => {
        cy.get('#length-requirement').should('contain', 'Ter no mínimo 8 caracteres').should('be.visible')
        cy.get('#lowercase-requirement').should('contain', 'Ter pelo menos 1 letra minúscula').should('be.visible')
        cy.get('#uppercase-requirement').should('contain', 'Ter pelo menos 1 letra maiúscula').should('be.visible')
        cy.get('#number-requirement').should('contain', 'Ter pelo menos 1 número').should('be.visible')
        cy.get('#special-char-requirement').should('contain', 'Ter pelo menos 1 caractere especial').should('be.visible')
    });
  });
  