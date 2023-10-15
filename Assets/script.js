
function currenDate() {
    const currentTimeEl = document.querySelector('#time')
    const date = dayjs().format('MMM D, YYYY [at] HH:mm:ss a')
    
    currentTimeEl.innerHTML = date
}

setInterval(currenDate, 1000);