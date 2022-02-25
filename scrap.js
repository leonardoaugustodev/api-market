import nightmare from 'nightmare'

const web = nightmare({ show: false})

const formatNumber = (value) => {
    return Number(value.replace(',', '.'))?.toFixed(2) || 0;
}

const getPrice = async (ticker) => {
    let url = `https://www.google.com/search?q=bvmf:${ticker}`;
    console.log(url);

    const result = await web
        .goto(url)
        .wait('div[data-attrid="Price"] > span > span > span')
        .evaluate(() => {

            const price = document.querySelector('div[data-attrid="Price"] > span > span > span').innerText;
            const openPrice = document.querySelector('tr[data-attrid="Abertura"] > td ~ td').innerText;
            const maxPrice = document.querySelector('tr[data-attrid="Alta"] > td ~ td').innerText;
            const lowPrice = document.querySelector('tr[data-attrid="Baixa"] > td ~ td').innerText;

            return { price, openPrice, maxPrice, lowPrice }
        })
        .then(result => {
            console.log(result);

            const { price, openPrice, maxPrice, lowPrice } = result;
            return {
                price: formatNumber(price),
                openPrice: formatNumber(openPrice),
                maxPrice: formatNumber(maxPrice),
                lowPrice: formatNumber(lowPrice)
            };
        })
        .catch(err => {
            console.log(JSON.stringify(err))
        })

    return result;
}

export { getPrice };