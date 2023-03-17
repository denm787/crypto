const API_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Cbinancecoin%2Cdecentral-games-ice%2Cmatic-network%2Ctron%2Ctrust-wallet-token%2Cfunfair%2Clitecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
const table = document.getElementById('table1')
let counter = 0; // Create a variable to hold the count

function rendertable(image,name, price,  maxsupply, marketcap, ath, atl){
    return `
<tr>
    <th>${counter++}</th> <!-- Display the count here -->
    <td><img src="${image}" class="img"></td>
    <td>${name}</td>
    <td>${price}</td>
    <td>${maxsupply}</td>
    <td>${marketcap}</td>
    <td class="green">${ath}</td>
    <td class="red">${atl}</td>
</tr>
  `;
}

async function fetchcoin(){
    const result = await fetch(API_URL);
    const data = await result.json();
    const coins = [];
    for(const item of data){
        coins.push({
            image: item.image,
            name: item.name,
            price: item.current_price,
            maxsupply: item.max_supply,
            marketcaprank: item.market_cap_rank,
            ath: item.ath,
            atl: item.atl
        })
    }
    return coins ;
}

async function render (){
    data = await fetchcoin();
    let html = `<th scope="row">`;
    counter = 1; // Reset the counter each time we render the table
    for(const item of data) {
       if(counter / 1 == 0){
        html = `${html}</th><th scope="row">`;
       }
        const tablehtml = rendertable(item.image, item.name, item.price, item.maxsupply, item.marketcaprank, item.ath, item.atl);
        html = `${html}${tablehtml}`;
    }
    html = `${html}</th>`
    table.innerHTML=html;
}

render()
setInterval(()=>{
    render();
},5000);
