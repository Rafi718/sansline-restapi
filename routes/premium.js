// HOME ADMIN

require('dotenv').config()
const express = require('express');
const { checkUsername, resetLimit } = require('../database/function');
const { addPremium, deletePremium, tokens, checkPremium, changeKey, resetOneLimit, resetTodayReq } = require('../database/premium');
const { isAuthenticated, notAuthenticated, isAdmin } = require('../lib/auth');
const router = express.Router();

router.get('/', isAdmin, async(req, res) => {
    res.render('premium/index', {
        layout: 'layouts/main'
    })
})

router.get('/add', isAdmin, async(req, res) => {
    res.render('premium/add',  {
        layout: 'layouts/main'
    });
});

router.post('/add', async (req, res) => {
    try {
        const { username, premiumTime, customKey, token } = req.body;

        if (token !== tokens) {
            console.log('Invalid Token');
            req.flash('error_msg', 'Invalid Token');
            return res.redirect('/premium/add');
        }

        const isRegistered = await checkUsername(username);
        console.log('isRegistered:', isRegistered);

        if (!isRegistered) {
            console.log('Username is not registered');
            req.flash('error_msg', 'Username is not registered');
            return res.redirect('/premium/add');
        }

        const isPremium = await checkPremium(username);
        console.log('isPremium:', isPremium);

        if (isPremium) {
            console.log('Username is already Premium');
            req.flash('error_msg', 'Username is already Premium');
            return res.redirect('/premium/add');
        }

        const days = parseInt(premiumTime, 10);

        await addPremium(username, customKey, days);
        console.log(`Success Added Premium ${username}`);
        req.flash('success_msg', `Success Added Premium ${username}`);
        return res.redirect('/premium');
    } catch (error) {
        console.error('An error occurred:', error);
        req.flash('error_msg', 'An error occurred while processing the request');
        return res.redirect('/premium/add');
    }
});


router.get('/delete', isAdmin, async(req, res) => {
    res.render('premium/delete',  {
        layout: 'layouts/main'
    });
});

router.post('/delete', isAdmin, async(req, res) => {
    let { username, token } = req.body;
    if (token != tokens) {
        req.flash('error_msg', 'Invalid Token');
        return res.redirect('/premium/delete');
    }
    let checking = await checkUsername(username);
    if (!checking) {
        req.flash('error_msg', 'Username is not registered');
        return res.redirect('/premium/delete');
    } else {
        let checkPrem = await checkPremium(username)
        if (checkPrem) {
            deletePremium(username);
            req.flash('success_msg', `Succes Delete Premium ${username}`);
            return res.redirect('/premium');
        } else {
            req.flash('error_msg', 'Username is not Premium');
            return res.redirect('/premium/delete');
        }
    };
});

module.exports = router;