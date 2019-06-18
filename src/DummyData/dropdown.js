export default {
    sets: [
        { name: 'Socials', data: ['Google', 'Facebook', 'Twitter'], selection: [] },
        {
            name: 'Marketing',
            data: ['G_Analytics', 'Pixel', 'Pinterest'],
            selection: [],
        },
    ],
    handleSelect: e => console.log(e.target.value),
};
