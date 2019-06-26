const invoices = [];

const makeInvoice = date => {
    return {
        date: new Date(2019, 6, date),
        name: 'Special Plan',
        quantity: date * 2,
        amount: date * 2 * 15,
        status: date % 3 !== 0
    };
};

for (let i = 3; i <= 22; i += 1) {
    invoices.push(makeInvoice(i));
}

export default {
    invoices
};
