describe('Página de campanha', () => {
    beforeEach(() => {
      cy.visit('https://metas-diarias.vercel.app/campanha.html')

      cy.viewport('iphone-x')
    });
  
    it('Deve exibir o campo para definir o nome da campanha', () => {
      cy.get('#campaign-name').should('be.visible')
    });
  
    it('Deve exibir o campo para definir a duração da campanha', () => {
      cy.get('#campaign-days').should('be.visible')
    });
  
    it('Deve exibir o campo para definir o horário da campanha', () => {
      cy.get('#campaign-hours').should('be.visible')
    });
  
    it('Deve voltar para a página inicial ao clicar no botão "Voltar"', () => {
      cy.get('.back-button').click()
      cy.url().should('include', 'index.html')
    });
  
    it('Deve adicionar a campanha à lista de campanhas ao clicar no botão "Definir nome da campanha"', () => {
      cy.get('#campaign-name').type('Minha Campanha');
      cy.get('#campaign-days').type('7');
      cy.get('#campaign-hours').type('08:00 - 12:00');
      cy.get('#set-campaign-button').click();
      cy.get('.campaign-list').should('have.length', 1);
      cy.get('.campaign-list').first().should('contain', 'Minha Campanha');
    });

    it('Deve ser possível adicionar mais de uma campanha', () => {
      cy.get('#campaign-name').type('Minha Campanha 1')
      cy.get('#campaign-days').type('7')
      cy.get('#campaign-hours').type('08:00 - 12:00')
      cy.get('#set-campaign-button').click()
      cy.get('.campaign-list').should('have.length', 1)
      cy.get('.campaign-list').first().should('contain', 'Minha Campanha 1')

      cy.get('#campaign-name').type('Minha Campanha 2')
      cy.get('#campaign-days').type('5')
      cy.get('#campaign-hours').type('12:00 - 14:00')
      cy.get('#set-campaign-button').click()
      // cy.get('.campaign-list').should('have.length', 2)
      cy.get('.campaign-list').first().should('contain', 'Minha Campanha 2')
    });

    it('Deve adicionar "1 dia" ao clicar no botão "Marcar dia"', () => {
      cy.get('#mark-day-button').should('be.visible').click()
      cy.get('#daily-counter').should('contain', '1 dia')
    });

    it('Deve existir o informartivo de marcação a cada 24 horas', () => {
      cy.contains('Marque um dia a cada 24 horas').should('be.visible')
    });

    it('Deve existir um baú com mensagens motivacionais aleatórias', () => {
      cy.get('#treasure-icon').should('be.visible').click()
      cy.get('#encouragement-message').should('be.visible').and('contain', '')
    });

    it('Deve ser possível fechar o modal de mensagens motivacionais', () => {
      cy.get('#treasure-icon').should('be.visible').click()
      cy.get('#encouragement-message').should('be.visible').and('contain', '')
      cy.get('#popup-close').should('be.visible').click()
    });
    
  });
  