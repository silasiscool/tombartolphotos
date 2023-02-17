let contentOutput = document.getElementById('content-output');
let loadingMessage = document.getElementById('loading-message');
let searchBar = document.getElementById('search-bar');

fetchData()

searchBar.addEventListener('input', () => {
  let itemTexts = document.querySelectorAll('.link-item > .item-text')
  document.querySelectorAll('.link-item').forEach((item, i) => {
    if (itemTexts[i].textContent.toLowerCase().includes(searchBar.value.toLowerCase())) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });

})

function dataReceive(data) {
  loadingMessage.classList.add('hidden')
  searchBar.classList.remove('hidden')
  data.forEach((item) => {
    let linkItem = document.createElement('a');
    linkItem.classList.add('link-item');
    linkItem.href = item.url;
    linkItem.setAttribute('target','_blank')
    let itemPhoto = document.createElement('img');
    itemPhoto.classList.add('item-photo');
    itemPhoto.src = item.photoUrl;
    linkItem.appendChild(itemPhoto);
    let itemText = document.createElement('p');
    itemText.innerHTML = item.previewText;
    itemText.classList.add('item-text');
    linkItem.appendChild(itemText);
    contentOutput.appendChild(linkItem);
  });
}

function fetchData() {
  let url = "https://script.google.com/macros/s/AKfycbyq6J9Jhm1FWj4iIosnVHpq_9EUTWfGWCkkALEUurZQyZUm15q14DprWW9cmjVAqNHzgw/exec";

  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  xhr.onreadystatechange = function () {
     if (xhr.readyState === 4) {
        dataReceive(JSON.parse(xhr.responseText));
     }};

  xhr.send();
}
