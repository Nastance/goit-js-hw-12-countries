
import './css/styles.css';
import debounce from 'lodash.debounce';
import refs from './js/refs';
import fetchCountries from './js/fetchCountries';
import createCountryCard from './templates/createCountryCard.hbs';
import createCountryList from './templates/createCountryList.hbs'

import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/core/dist/BrightTheme.css';


defaultModules.set(PNotifyMobile, {});

refs.form.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(event) {
    const inputValue = event.target.value;
    // console.log(inputValue);
    refs.articlesContainer.innerHTML = '';

    if (!inputValue) {
        return
    }

    fetchCountries(inputValue).then((data) => {
        console.log(data);
        if (data.length > 10) {
            alert({
                text: 'Too many matches found. Please enter a more specific query!',
                delay: 2000,
            })
        } else if (data.length > 1 && data.length < 10) {
            refs.articlesContainer.innerHTML = createCountryList(data);
        } else if (data.length === 1) {
            refs.articlesContainer.innerHTML = createCountryCard(data);
        }
    }).catch((error) => {
        alert({
            text: 'Country was not found!',
            delay: 2000,
        })
    })
};
