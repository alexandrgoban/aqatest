// const {faker} = require('@faker-js/faker');
import {faker} from '@faker-js/faker';

export const newUser1 = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: process.env.NEW_USER_1_PASSWORD,
    city: faker.location.city(),
    country: 'Ukraine',
    phone: "+380981302421",
    street: faker.location.street(),
    zip: '12344',
}

export const cardData = {
    cardNumber: '1234567891234567',
    cardDate: '01/28',
    cardCVV: faker.finance.creditCardCVV(),

}

export const apiDataPost = {
    title: 'Hello',
    body: 'Test body',
    userId: 1,
}

export const apiDataPatch = {
    title: 'Hello AQA',
}