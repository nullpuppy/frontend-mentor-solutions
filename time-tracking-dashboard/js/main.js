async function initialize() {
    let allStats = await fetch('data.json').then((response) => {
        if (!response.ok) {
            console.log('Failure getting data!');
            return null;
        }

        return response.json();
    });

    let scales = document.querySelectorAll('[id^=select-]');
    scales.forEach((el) => {
        el.addEventListener('click', handleChangeTimescale);
    });

    let dataTiles = document.getElementsByClassName('data-tile');
    console.log(scales);
    let currentTimeframe = Array.from(scales).filter((node) => {
        return node.classList.contains('active');
    })[0];
    setTilesForTimeScale(currentTimeframe?.textContent?.toLowerCase());

    async function handleChangeTimescale(e) {
        scales.forEach((el) => {
            el.classList.remove('active');
        });
        e.currentTarget.classList.toggle('active');
        let timescale = e.currentTarget.textContent.toLowerCase();

        setTilesForTimeScale(timescale);
    }

    async function setTilesForTimeScale(timescale) {
        for (let tile of dataTiles) {
            let title = tile.getElementsByTagName('h2')[0]?.textContent;
            let tileData = tile.getElementsByTagName('p');

            let statsForTile = allStats.filter((v) => {
                return v.title == title
            })[0]?.timeframes[timescale];

            let previousText = (timescale == 'daily')
                ? 'Yesterday' : (timescale == 'weekly')
                ? 'Last Week' : (timescale == 'monthly')
                ? 'Last Month' : 'Unknown';
            if (!title || !tileData || !statsForTile) {
                console.error('Missing required elements or stats: ', title, tileData, statsForTile);
                tileData[0].textContent = '???';
                tileData[1].textContent = 'Previous period - ???';
                continue;
            }

            tileData[0].textContent = statsForTile.current + 'hrs';
            tileData[1].textContent = previousText + ' - ' + statsForTile.previous + 'hrs';
        }
    }
}

document.addEventListener('DOMContentLoaded', initialize);