describe('todomvc', () => {
  const url = 'http://localhost:3000';

  context('when no todos present', () => {
    beforeEach(() => cy.visit(url));

    it('does not show toggle all button', () => {
      cy.get('input.toggle-all').should('not.exist');
    });

    it('does not show list footer', () => {
      cy.get('footer.footer').should('not.exist');
    });

    it('shows form', () => {
      cy.get('input.new-todo').should('be.visible');
    });
  });

  describe('new todo form', () => {
    beforeEach(() => cy.visit(url));

    it('does not create new todo when input is blank', () => {
      cy.get('input.new-todo').type('    ');
      cy.get('input.new-todo').type('{enter}');

      cy.get('.todo-list').should('not.exist');
    });

    it('allows creation of new todo', () => {
      cy.get('input.new-todo').type('    Test todo    ');
      cy.get('input.new-todo').type('{enter}');

      cy.get('.todo-list li')
        .should('have.length', 1)
        .last()
        .should('have.text', 'Test todo');
    });

    it('does not create new todo on typing & escape', () => {
      cy.get('input.new-todo').type('Test todo');
      cy.get('input.new-todo').type('{esc}');

      cy.get('input.new-todo').should('have.value', '');

      cy.get('.todo-list').should('not.exist');
    });
  });

  context('when todos are present', () => {
    const activeTodos = [
      { id: '001', title: 'Test todo 001', completed: false },
      { id: '002', title: 'Test todo 002', completed: false },
    ];
    const completedTodos = [
      { id: '003', title: 'Test todo 003', completed: true },
    ];
    const todos = [...activeTodos, ...completedTodos];
    beforeEach(() => {
      cy.visit(url);
      todos.forEach(({ title, completed }) => {
        cy.get('input.new-todo').type(title);
        cy.get('input.new-todo').type('{enter}');

        if (completed) {
          cy.get('.todo-list > li input.toggle').last().click({ force: true });
        }
      });
    });

    it('shows toggle all button', () => {
      cy.get('input.toggle-all').should('exist');
    });

    context('toggle all', () => {
      it('marks all as complete when some are active', () => {
        cy.get('input.toggle-all').click({ force: true });

        cy.get('footer.footer > ul.filters > li > a')
          .contains('Completed')
          .click();
        todos.forEach(({ title }) =>
          cy.get('.todo-list li').contains(title).should('be.visible')
        );

        cy.get('footer.footer > ul.filters > li > a')
          .contains('Active')
          .click();
        cy.get('.todo-list li').should('not.exist');

        cy.get('footer.footer > span.todo-count').should(
          'have.text',
          '0 items left'
        );
      });

      it('marks all as active when all are completed', () => {
        cy.get('input.toggle-all').click({ force: true });

        cy.get('footer.footer > ul.filters > li > a')
          .contains('Completed')
          .click();
        todos.forEach(({ title }) =>
          cy.get('.todo-list li').contains(title).should('be.visible')
        );

        cy.get('footer.footer > ul.filters > li > a')
          .contains('Active')
          .click();
        cy.get('.todo-list li').should('not.exist');

        cy.get('footer.footer > span.todo-count').should(
          'have.text',
          '0 items left'
        );

        cy.get('input.toggle-all').click({ force: true });
        cy.get('footer.footer > ul.filters > li > a')
          .contains('Completed')
          .click();
        cy.get('.todo-list li').should('not.exist');

        cy.get('footer.footer > ul.filters > li > a')
          .contains('Active')
          .click();
        todos.forEach(({ title }) =>
          cy.get('.todo-list li').contains(title).should('be.visible')
        );
        cy.get('footer.footer > span.todo-count').should(
          'have.text',
          '3 items left'
        );
      });
    });

    context('footer', () => {
      it('shows active todo count', () => {
        cy.get('footer.footer > span.todo-count').should(
          'have.text',
          '2 items left'
        );
      });

      context('filter', () => {
        it('can be changed to "Active"', () => {
          cy.get('footer.footer > ul.filters > li > a')
            .contains('Active')
            .click();

          cy.get('footer.footer > ul.filters > li > a.selected').should(
            'have.text',
            'Active'
          );

          cy.get('.todo-list li').should('have.length', activeTodos.length);
          activeTodos.forEach(({ title }) =>
            cy.get('.todo-list li').contains(title).should('be.visible')
          );
          completedTodos.forEach(({ title }) =>
            cy.get('.todo-list li').contains(title).should('not.exist')
          );
        });

        it('can be changed to "Completed"', () => {
          cy.get('footer.footer > ul.filters > li > a')
            .contains('Completed')
            .click();

          cy.get('footer.footer > ul.filters > li > a.selected').should(
            'have.text',
            'Completed'
          );
          cy.get('.todo-list li').should('have.length', completedTodos.length);
          completedTodos.forEach(({ title }) =>
            cy.get('.todo-list li').contains(title).should('be.visible')
          );
          activeTodos.forEach(({ title }) =>
            cy.get('.todo-list li').contains(title).should('not.exist')
          );
        });

        it('can be changed to "All"', () => {
          cy.get('footer.footer > ul.filters > li > a')
            .contains('Completed')
            .click();
          cy.get('footer.footer > ul.filters > li > a').contains('All').click();
          cy.get('footer.footer > ul.filters > li > a.selected').should(
            'have.text',
            'All'
          );
          cy.get('.todo-list li').should('have.length', todos.length);
        });
      });

      it('clears completed on clicking "Clear completed"', () => {
        cy.get('button').contains('Clear completed').click();
        cy.get('footer.footer > ul.filters > li > a').contains('All').click();

        completedTodos.forEach(({ title }) =>
          cy.get('.todo-list li').contains(title).should('not.exist')
        );
        activeTodos.forEach(({ title }) =>
          cy.get('.todo-list li').contains(title).should('be.visible')
        );
      });
    });

    it('shows form', () => {
      cy.get('input.new-todo').should('be.visible');
    });

    it('allows creation of new todo', () => {
      cy.get('input.new-todo').type('Test todo');
      cy.get('input.new-todo').type('{enter}');

      cy.get('.todo-list li')
        .should('have.length', 4)
        .last()
        .should('have.text', 'Test todo');
    });

    it('does not create new todo on typing & escape', () => {
      cy.get('input.new-todo').type('Test todo');
      cy.get('input.new-todo').type('{esc}');

      cy.get('input.new-todo').should('have.value', '');

      cy.get('.todo-list li').should('have.length', 3);
    });
  });

  context('when only completed todos are present', () => {
    const completedTodos = [
      { id: '001', title: 'Test todo 001', completed: true },
      { id: '002', title: 'Test todo 002', completed: true },
      { id: '003', title: 'Test todo 003', completed: true },
    ];
    beforeEach(() => {
      cy.visit(url);
      completedTodos.forEach(({ title, completed }) => {
        cy.get('input.new-todo').type(title);
        cy.get('input.new-todo').type('{enter}');

        if (completed) {
          cy.get('.todo-list > li input.toggle').last().click({ force: true });
        }
      });
    });

    it('shows toggle all button', () => {
      cy.get('input.toggle-all').should('exist');
    });

    context('footer', () => {
      it('shows active todo count as 0', () => {
        cy.get('footer.footer > span.todo-count').should(
          'have.text',
          '0 items left'
        );
      });

      context('filter', () => {
        it('"Active" list is empty', () => {
          cy.get('footer.footer > ul.filters > li > a')
            .contains('Active')
            .click();

          cy.get('footer.footer > ul.filters > li > a.selected').should(
            'have.text',
            'Active'
          );

          cy.get('.todo-list li').should('not.exist');
        });

        it('"Completed" shows all todos', () => {
          cy.get('footer.footer > ul.filters > li > a')
            .contains('Completed')
            .click();

          cy.get('footer.footer > ul.filters > li > a.selected').should(
            'have.text',
            'Completed'
          );
          cy.get('.todo-list li').should('have.length', completedTodos.length);
          completedTodos.forEach(({ title }) =>
            cy.get('.todo-list li').contains(title).should('be.visible')
          );
        });

        it('"All" shows all todos', () => {
          cy.get('footer.footer > ul.filters > li > a')
            .contains('Completed')
            .click();
          cy.get('footer.footer > ul.filters > li > a').contains('All').click();
          cy.get('footer.footer > ul.filters > li > a.selected').should(
            'have.text',
            'All'
          );
          cy.get('.todo-list li').should('have.length', completedTodos.length);
        });
      });

      it('clears completed on clicking "Clear completed"', () => {
        cy.get('button').contains('Clear completed').click();

        cy.get('.todo-list li').should('not.exist');
      });

      it('does not show footer on clicking "Clear completed"', () => {
        cy.get('button').contains('Clear completed').click();

        cy.get('footer.footer').should('not.exist');
      });
    });

    it('shows form', () => {
      cy.get('input.new-todo').should('be.visible');
    });

    it('allows creation of new todo', () => {
      cy.get('input.new-todo').type('Test todo');
      cy.get('input.new-todo').type('{enter}');

      cy.get('.todo-list li')
        .should('have.length', 4)
        .last()
        .should('have.text', 'Test todo');
    });

    it('does not create new todo on typing & escape', () => {
      cy.get('input.new-todo').type('Test todo');
      cy.get('input.new-todo').type('{esc}');

      cy.get('input.new-todo').should('have.value', '');

      cy.get('.todo-list li').should('have.length', 3);
    });
  });

  describe('todo item', () => {
    const todos = [
      { id: '001', title: 'Test todo 001', completed: false },
      { id: '002', title: 'Test todo 002', completed: true },
    ];
    beforeEach(() => {
      cy.visit(url);
      todos.forEach(({ title, completed }) => {
        cy.get('input.new-todo').type(title);
        cy.get('input.new-todo').type('{enter}');

        if (completed) {
          cy.get('.todo-list > li input.toggle').last().click();
        }
      });
    });

    it('shows editor on double click', () => {
      cy.get('.todo-list > li').eq(0).dblclick();
      cy.get('.todo-list > li.editing > input').should(
        'have.value',
        todos[0].title
      );
    });

    describe('editor', () => {
      beforeEach(() => {
        cy.get('.todo-list > li').eq(0).dblclick();
      });

      it('discards changes on pressing escape', () => {
        cy.get('.todo-list > li.editing > input')
          .clear()
          .type('Updated test todo');
        cy.get('.todo-list > li.editing > input').type('{esc}');

        cy.get('.todo-list > li.editing').should('not.exist');
        cy.get('.todo-list > li').eq(0).should('have.text', todos[0].title);
      });

      it('saves trimmed changes on pressing enter', () => {
        cy.get('.todo-list > li.editing > input')
          .clear()
          .type('    Updated test todo   ');
        cy.get('.todo-list > li.editing > input').type('{enter}');

        cy.get('.todo-list > li.editing').should('not.exist');
        cy.get('.todo-list > li')
          .eq(0)
          .should('have.text', 'Updated test todo');
      });

      it('deletes when title is blank & enter is pressed', () => {
        cy.get('.todo-list > li.editing > input').clear().type('       ');
        cy.get('.todo-list > li.editing > input').type('{enter}');

        cy.get('.todo-list > li.editing').should('not.exist');
        cy.get('.todo-list > li').should('have.length', 1);
      });
    });

    describe('toggle completion', () => {
      it('changes active to completed', () => {
        cy.get('.todo-list > li input.toggle').eq(0).click();
        cy.get('footer.footer > ul.filters > li > a')
          .contains('Completed')
          .click();

        cy.get('.todo-list li').should('have.length', todos.length);
        todos.forEach(({ title }) =>
          cy.get('.todo-list li').contains(title).should('be.visible')
        );
      });

      it('changes completed to active', () => {
        cy.get('.todo-list > li input.toggle').eq(1).click();
        cy.get('footer.footer > ul.filters > li > a')
          .contains('Active')
          .click();

        cy.get('.todo-list li').should('have.length', todos.length);
        todos.forEach(({ title }) =>
          cy.get('.todo-list li').contains(title).should('be.visible')
        );
      });
    });

    it('can be deleted', () => {
      cy.get('.todo-list > li button.destroy').eq(0).click({ force: true });
      cy.get('.todo-list li').should('have.length', 1);
    });
  });
});
