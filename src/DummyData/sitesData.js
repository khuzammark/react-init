const sites = [];

const makeSite = date => {
    return {
        updated: new Date(2019, 6, date),
        site: `Site ${date}`,
        recipe: date % 2 === 0 ? 'Recipe 1' : 'Recipe 2',
        status: 3 - Math.floor(Math.random() * 3)
    };
};

for (let i = 3; i <= 22; i += 1) {
    sites.push(makeSite(i));
}

export default {
    sites
};
