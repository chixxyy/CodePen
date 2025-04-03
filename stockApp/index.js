const symbolInput = document.querySelector('#symbol');
const stockList = document.querySelector('#stock-list');

function fetchTopStocks() {
    fetch('https://www.alphavantage.co/query?function=SECTOR&apikey=YAWLU5KC5N2EK0IU')
        .then(response => response.json())
        .then(data => {
            const stocks = data['Rank A: Real-Time Performance'];
            if (!stocks) {
                stockList.innerHTML = '<li class="error">無法獲取股票數據</li>';
                return;
            }

            let html = '';
            const symbols = Object.keys(stocks);
            symbols.forEach(symbol => {
                const change = stocks[symbol];
                const changeColor = parseFloat(change) >= 0 ? 'green' : 'red';
                html += `
                <li>
                    <div><strong>股票代號:</strong> ${symbol}</div>
                    <div><strong>變動:</strong> <span style="color: ${changeColor}">${change}</span></div>
                </li>`;
            });
            stockList.innerHTML = html;
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            stockList.innerHTML = '<li class="error">API請求失敗</li>';
        });
}

function fetchStockData(symbol) {
    if (!symbol) {
        fetchTopStocks();
        return;
    }

    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=YAWLU5KC5N2EK0IU`)
        .then(response => response.json())
        .then(data => {
            const quote = data['Global Quote'];
            if (!quote || Object.keys(quote).length === 0) {
                stockList.innerHTML = '<li class="error">查無資料</li>';
                return;
            }

            const symbol = quote['01. symbol'];
            const open = quote['02. open'];
            const high = quote['03. high'];
            const low = quote['04. low'];
            const price = quote['05. price'];
            const volume = quote['06. volume'];
            const latestDay = quote['07. latest trading day'];
            const prevClose = quote['08. previous close'];
            const change = quote['09. change'];
            const changePercent = quote['10. change percent'].replace('%', '');
            
            const changeColor = parseFloat(change) >= 0 ? 'green' : 'red';

            const html = `
                <li>
                    <div><strong>股票代號:</strong> ${symbol}</div>
                    <div><strong>開盤價:</strong> ${open}</div>
                    <div><strong>最高價:</strong> ${high}</div>
                    <div><strong>最低價:</strong> ${low}</div>
                    <div><strong>收盤價:</strong> ${price}</div>
                    <div><strong>成交量:</strong> ${volume}</div>
                    <div><strong>最近交易日:</strong> ${latestDay}</div>
                    <div><strong>前日收盤:</strong> ${prevClose}</div>
                    <div><strong>價格變動:</strong> <span style="color: ${changeColor}">${change}</span></div>
                    <div><strong>變動百分比:</strong> <span style="color: ${changeColor}">${changePercent}%</span></div>
                </li>
            `;
            stockList.innerHTML = html;
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            stockList.innerHTML = '<li class="error">API請求失敗</li>';
        });
}

fetchTopStocks();

document.querySelector('form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const symbol = symbolInput.value.toUpperCase();
    fetchStockData(symbol);
});