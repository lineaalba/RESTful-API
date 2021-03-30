/**
 * Hateoas messages
 *
 * @author Filippa Jakobsson
 * @version 1.0.0
 */

const express = require('express')
const router = express.Router()

/**
 * HATEOAS all links.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const allLinks = (req, res, next) => {
    res.json({
        message: req.message,
        data: req.data,
        meta: {
            title: 'RESTful API for saving fish catches at LNU Fishing Club',
            author: 'Filippa Jakobsson',
            desc: 'JWT for authentication. Login and save token, set token in headers as auth-token'
        },
        _links: {
            self: {
                href: `https://${req.headers.host}`,
                method: 'GET'
            },
            accounts: {
                register: {
                    href: `https://${req.headers.host}/accounts`,
                    method: 'POST',
                    desc: 'Register account: set firstname, lastname, email and password password in body as JSON'
                },
                login: {
                    href: `https://${req.headers.host}/accounts/login`,
                    method: 'POST',
                    desc: 'Login: set email and password in body as JSON'
                },
                update: {
                    href: `https://${req.headers.host}/accounts`,
                    method: 'PUT',
                    authentication: 'true',
                    desc: 'Update: set account id as "id" and updated firstname, lastname and email in body as JSON'
                },
                delete: {
                    href: `https://${req.headers.host}/accounts`,
                    method: 'DELETE',
                    authentication: 'true',
                    desc: 'Delete: set account id as "id" in body as JSON'
                },
                view: {
                    href: `https://${req.headers.host}/accounts`,
                    method: 'GET',
                    authentication: 'true',
                    desc: 'View account: set account id as "id" in body as JSON'
                }
            },
            catches: {
                viewAll: {
                    href: `https://${req.headers.host}/catches`,
                    method: 'GET',
                    authentication: 'true',
                    desc: 'View all catches'
                },
                viewOne: {
                    href: `https://${req.headers.host}/catches`,
                    method: 'GET',
                    authentication: 'true',
                    desc: 'To view specific catch: set catch id as "id" in body as JSON'
                },
                add: {
                    href: `https://${req.headers.host}/catches`,
                    method: 'POST',
                    authentication: 'true',
                    desc: 'To add catch: set email, accountID, specie, weightKG, lengthCM, city, lake, location, dateYYMMDD and imageURL in body as JSON'
                },
                update: {
                    href: `https://${req.headers.host}/catches`,
                    method: 'PUT',
                    authentication: 'true',
                    desc: 'To update catch: set catch id as "id" and updated specie, weightKG, lengthCM, city, lake, location, dateYYMMDD and imageURL in body as JSON'
                },
                delete: {
                    href: `https://${req.headers.host}/catches`,
                    method: 'DELETE',
                    authentication: 'true',
                    desc: 'To delete catch: set catch id as "id" and account id as "accountID" in body as JSON'
                }
            },
            webhooks: {
                view: {
                    href: `https://${req.headers.host}/webhooks`,
                    method: 'GET',
                    authentication: 'true',
                    desc: 'View a webhook: set webhook id as "id" in body as JSON'
                },
                add: {
                    href: `https://${req.headers.host}/webhooks`,
                    method: 'POST',
                    authentication: 'true',
                    desc: 'Add webhook: set email, accountID and url in body as JSON'
                },
                delete: {
                    href: `https://${req.headers.host}/webhooks`,
                    method: 'DELETE',
                    authentication: 'true',
                    desc: 'Delete a webhook: set webhook id as "id" in body as JSON'
                }
            }
        }
    })
}

// Exports
module.exports.allLinks = allLinks