'use strict';

const formAssemblor = new FormAssemblor();
const formor = new Formor();

formAssemblor.setUp()
  .then(() => formor.setUp(formor));