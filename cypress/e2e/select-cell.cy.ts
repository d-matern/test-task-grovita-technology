describe('Тест выбора ячеек', () => {
  it('Выбор одной ячейки', () => {
    cy.visit('/');
    cy.get('rect').first().click().invoke('attr', 'data-cell-id').should('eq', '0');

    cy.get('button[name="apply-color"]').click();
    cy.get('rect').first().invoke('attr', 'fill').should('eq', '#ff0000');
  });

  it('Выбор группы ячеек', () => {
    cy.visit('/');

    cy.get('rect').eq(35).trigger('mousedown');
    cy.get('rect').eq(70).trigger('mousemove');

    cy.get('svg').trigger('mouseup');

    cy.get('rect').filter('[fill="#0000ff4d"]').should('have.length', 18);

    cy.get('button[name="apply-color"]').click();
    cy.get('rect').filter('[fill="#ff0000"]').should('have.length', 18);
  });
});
