describe('Página de "Dias sem pecar"', () => {
    beforeEach(() => {
      cy.visit('https://metas-diarias.vercel.app/diasSemPecar.html')

      cy.viewport('iphone-x')
    });
  
    it('Deve exibir o botão "Checklist do bem"', () => {
      cy.get('#checklist-button').should('be.visible')
    });
  
    it('Deve exibir o modal de checklist ao clicar no botão "Checklist do bem"', () => {
      cy.get('#checklist-button').click()
      cy.get('#checklist-modal').should('be.visible')
    });
  
    it('Deve marcar um dia e incrementar o contador de dias', () => {
      cy.get('#mark-day-button').should('be.visible').click()
      cy.get('#days-counter').should('contain', '1')
    });
  
    it('Deve voltar para a página inicial ao clicar no botão "Voltar"', () => {
      cy.get('.back-button').should('be.visible').click()
      cy.url().should('include', 'index.html')
    });
  
    it('Deve salvar os itens parcialmente marcados no checklist', () => {
      cy.get('#checklist-button').should('be.visible').click()
      cy.get('.checklist-item').first().click()
      cy.get('.checklist-item').eq(2).click()
      cy.get('.checklist-item').eq(4).click()
      cy.get('#save-button').should('be.visible').click()
      cy.contains('Muito bem, você marcou alguns itens da checklist. Observe onde errou para amanhã não cometer o mesmo erro.').should('be.visible')
    });

    it('Deve exibir mensagem caso tente salvar checklist sem marcar nenhum item', () => {
      cy.get('#checklist-button').should('be.visible').click()
      cy.get('#save-button').should('be.visible').click()
      cy.contains('Por favor, marque pelo menos um item da checklist.').should('be.visible')
    });

    it('Deve salvar todos os itens marcado da checklist', () => {
      cy.get('#checklist-button').should('be.visible').click()
      cy.get('.checklist-item').each(($element) => {
        // Marcar cada checkbox
        cy.wrap($element).find('input[type="checkbox"]').check({ force: true })
      })
      cy.get('#save-button').should('be.visible').click()
      cy.get('.fireworks').should('be.visible')
      cy.contains('Você concluiu a checklist do bem, meus parabéns!').should('be.visible')
      
    })
  })