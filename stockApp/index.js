const symbolInput = document.querySelector('#symbol');
const stockList = document.querySelector('#stock-list');

function fetchTopStocks() {
    fetch('https://www.alphavantage.co/query?function=SECTOR&apikey=YAWLU5KC5N2EK0IU')
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data); // 新增這行來檢查回應
            const stocks = data['Rank A: Real-Time Performance'];

            if (!stocks) {
                stockList.innerHTML = '<li class="error">無法獲取股票數據</li>';
                return;
            }

            let html = '';
            const symbols = Object.keys(stocks);
            for (let i = 0; i < Math.min(10, symbols.length); i++) {
                const symbol = symbols[i];
                const change = stocks[symbol];
                const changeColor = parseFloat(change) > 0 ? 'green' : 'red';
                html += `
                <li>
                    <span class="symbol">${symbol}</span>
                    <span class="change" style="color: ${changeColor}">${change}</span>
                </li>`;
            }

            stockList.innerHTML = html;
        })
        .catch(error => console.error('Fetch Error:', error));
}

function fetchStockData(symbol) {
    if (!symbol) {
        fetchTopStocks();
        return;
    }

    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=YAWLU5KC5N2EK0IU`).then(response => response.json()).then(data => {
        const quote = data['Global Quote'];
        if (quote && quote['10. change percent']) {
            const changePercent = quote['10. change percent'].replace('%', '');
            const changeColor = parseFloat(changePercent) > 0 ? 'green' : 'red';
            const html = `
                <li>
                    <span class="symbol">${symbol}</span>
                    <span class="change" style="color: ${changeColor}">${changePercent}</span>
                </li>
            `;
            stockList.innerHTML = html;
        } else {
            stockList.innerHTML = '<li class="error">查無資料</li>';
        }    
    }).catch(error => console.error(error));
}

fetchTopStocks();

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const symbol = symbolInput.value.toUpperCase();
    fetchStockData(symbol);
});