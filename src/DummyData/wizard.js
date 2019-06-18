import React from 'react';
import DummyForm from './dummyForm';
import DummyForm2 from './dummyForm2';

export default {
    title: 'Wizard Title',
    steps: [
        { name: 'Sign Up', component: <DummyForm /> },
        { name: 'Shipping', component: <DummyForm2 /> },
        { name: 'All Done', component: <DummyForm /> }
    ],
    onComplete: () => console.log('complete!'),
    completeName: 'Finish'
};
