import { hasOperationName } from '../../utils/graphql';

const citiesData = [
    { id: '1', name: 'Manchester' },
    { id: '2', name: 'Edinburgh' }
];

describe('Searching from the home page', () => {
    beforeEach(() => {
        cy.intercept({ method: 'POST', url: '/graphql' }, (req) => {
            if (hasOperationName(req, 'GetCities')) {
                req.reply((res) => {
                    res.body.data.getCities = citiesData;
                });
            }
        });

        cy.visit('http://localhost:3000');
    });

    it('Displays list of locations available for search', () => {
        cy.get('.BaseSearch select option')
            .should(($options) => {
                const availableCities = [...$options].map((o) => o.textContent);
                expect(availableCities).to.deep.eq(['Select city', ...citiesData.map((c) => c.name)]);
            });
    });

    it('Redirects to Search Results page', () => {
        const { name, id } = citiesData[0];

        cy.get('.BaseSearch select').select(name);
        cy.contains('For sale').click();

        cy.url().should('contain', `/sale?city=${id}`);
    });
});
