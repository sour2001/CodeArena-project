const express = require('express');
const path = require('path')
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

// let lastUpdated = 0;

const atcoderupd = function () {
    try {
        axios('https://atcoder.jp/')
            .then(res => {
                const html = res.data;
                const $ = cheerio.load(html);
                const articles = [];
                let name, time, timeLink, nameLink;
                $('#contest-table-active', html).each(function () {
                    let j = 0;
                    $(this).find('td').each(function () {                    
                        const a = $(this).find('a');                        
                        if (j == 0) {
                            timeLink = a.attr('href');
                            time = a.text();
                        }
                        if (j == 1) {
                            name = a.text();
                            nameLink = 'https://atcoder.jp'+a.attr('href');
                        }
                        j++;
                    })
                    if (name != undefined) {
                        articles.push({ name, nameLink, time, timeLink });
                    }
                })
                $('#contest-table-upcoming', html).each(function () {
                    $(this).find('tbody').find('tr').each(function () {
                        let i = 0;
                        $(this).find('td').each(function () {
                            var b = $(this).find('a');
                            if (i == 0) {
                                timeLink = b.attr('href');                                
                                time = b.text();
                            }
                            if (i == 1) {
                                name = b.text();
                                nameLink ='https://atcoder.jp'+b.attr('href');
                            }
                            i++;
                        })
                        if (name != undefined) {
                            var codePrevUpd = Date.now();
                            articles.push({ name, nameLink, time, timeLink ,codePrevUpd});
                        }
                    })
                })

                
                
            })
            .catch(err => console.log(err));
    }
    catch (err) { console.log('atcoder error') }
}
atcoderupd();
module.exports = atcoderupd;