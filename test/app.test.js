'use strict';

const app = require('../express-server');
const supertest = require('supertest');
const { expect } = require('chai');

describe('GET /apps endpoint', () => {
    it('should return an array of apps from the server', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.an('array');
            });
    });

    const sortFilter = ['Rating', 'App'];
    sortFilter.forEach((filter) => {
        it(`should sort results based on ${filter}`, () => {
            return supertest(app)
                .get('/apps')
                .query({ sort: filter })
                .expect(200)
                .then((res) => {
                    let sorted = true;
                    let i = 0;
                    while (i < res.body.length - 1) {
                        if (res.body[i][filter] > res.body[i + 1][filter]) {
                            sorted = false;
                            break;
                        }
                        i++;
                    }
                    expect(sorted).to.be.true;
                });
        });
    });

    let genreFilter = [
        'Action',
        'Puzzle',
        'Strategy',
        'Casual',
        'Arcade',
        'Card',
    ];
    genreFilter.forEach((filter) => {
        it(`should return a list filtered by ${filter}`, () => {
            return supertest(app)
            .get('/apps')
            .query({ genres: filter })
            .expect(200)
            .then((res) => {
                let filterTest = res.body.filter(app => {
                    return app.Genres.includes(filter);
                })
                expect(filterTest).to.have.lengthOf.at.least(1);
            });
        });
    });
});
