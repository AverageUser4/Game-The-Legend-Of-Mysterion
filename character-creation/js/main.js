'use strict';

const fa = new FormAssemblor();

// formor is dependend on asynchronous request made by form assemblor
let formor;
setTimeout(() => formor = new Formor(), 500);
