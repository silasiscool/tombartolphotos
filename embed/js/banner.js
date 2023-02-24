const banner = document.getElementById('banner');

fetch('https://script.google.com/macros/s/AKfycbw0FDK6XzgKAqXn1DTrSzrxrWKfqFwXPcmdJ0ZawQaAsvkTsJ0krA09kmsu2dk6YVChXg/exec')
  .then(res=>res.text())
  .then(text=>JSON.parse(text))
  .then(bannerContent=>{
    if (bannerContent!=="") {
      banner.innerHTML = bannerContent;
      banner.classList.remove('hidden-banner')
    };
  });
