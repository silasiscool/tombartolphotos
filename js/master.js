let contentOutput = document.getElementById('content-output');
let loadingMessage = document.getElementById('loading-message');
let searchBar = document.getElementById('search-bar');

fetchData()

searchBar.addEventListener('input', () => {
  // search for ungrouped items
  let itemTexts = document.querySelectorAll('.link-item > .item-text')
  document.querySelectorAll('.link-item').forEach((item, i) => {
    if (itemTexts[i].textContent.toLowerCase().includes(searchBar.value.toLowerCase())) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
  // search for groups
  let groupTexts = document.querySelectorAll('.group-item .group-name')
  document.querySelectorAll('.group-item').forEach((item, i) => {
    let children = item.getElementsByClassName('group-list')[0].children
    let childrenTexts = Array.from(children)
    childrenTexts.forEach((item, i) => {
      childrenTexts[i] = item.getElementsByClassName('group-item-text')[0].textContent;
    });

    if (groupTexts[i].textContent.toLowerCase().includes(searchBar.value.toLowerCase())) {
      item.classList.remove('hidden')
    } else {
      childrenTexts.forEach((childText, childi) => {
        if (childText.toLowerCase().includes(searchBar.value.toLowerCase())) {
          item.classList.remove('hidden')
          if (!item.classList.contains('open')) {
            item.classList.add('auto-open','open')
          }

        } else {
          item.classList.add('hidden')
          if (item.classList.contains('auto-open')) {
            item.classList.remove('open')
            console.log('test');
          }
        }
      });


      // if (true) {
      //
      // } else {
      //   item.classList.add('hidden');
      // }
    }
  });


  // search for items in groups

})

function dataReceive(data) {
  loadingMessage.classList.add('hidden')
  searchBar.classList.remove('hidden')

  data.forEach((item) => {
    if (!item.group) {
      let linkItem = document.createElement('a');
      linkItem.classList.add('link-item');
      linkItem.href = item.url;
      linkItem.setAttribute('target','_blank')
      let itemPhoto = document.createElement('img');
      itemPhoto.classList.add('item-photo');
      itemPhoto.src = item.photoUrl;
      linkItem.appendChild(itemPhoto);
      let itemText = document.createElement('p');
      itemText.textContent = item.previewText;
      itemText.classList.add('item-text');
      linkItem.appendChild(itemText);
      contentOutput.appendChild(linkItem);

    } else if (contentOutput.children.namedItem(item.group)) {
      let group = contentOutput.children.namedItem(item.group)
      group.getElementsByClassName('group-item-button')[0].getElementsByClassName('group-photo')[0].src = item.photoUrl;
      let groupList = group.children[1]
      let groupLinkItem = document.createElement('a');
      groupLinkItem.classList.add('group-link-item');
      groupLinkItem.href = item.url;
      groupLinkItem.setAttribute('target','_blank')
      let groupItemPhoto = document.createElement('img');
      groupItemPhoto.classList.add('group-item-photo');
      groupItemPhoto.src = item.photoUrl;
      groupLinkItem.appendChild(groupItemPhoto);
      let groupItemText = document.createElement('p');
      groupItemText.textContent = item.previewText;
      groupItemText.classList.add('group-item-text');
      groupLinkItem.appendChild(groupItemText);
      groupList.appendChild(groupLinkItem);

    } else {
      let groupItem = document.createElement('div');
      groupItem.classList.add('group-item')
      groupItem.setAttribute('name',item.group);
      let groupItemButton = document.createElement('button');
      groupItemButton.classList.add('group-item-button');
      let groupPhoto = document.createElement('img');
      groupPhoto.classList.add('group-photo');
      groupPhoto.src = item.photoUrl;
      groupItemButton.appendChild(groupPhoto);
      let groupName = document.createElement('p');
      groupName.textContent = item.group;
      groupName.classList.add('group-name');
      groupItemButton.appendChild(groupName);
      groupItem.appendChild(groupItemButton);

      groupItemButton.addEventListener('click', () => {
        groupItem.classList.toggle('open')
        groupItemText.classList.remove('auto-open')
      })
      let groupList = document.createElement('div');
      groupList.classList.add('group-list')
      groupItem.appendChild(groupList)
      contentOutput.appendChild(groupItem);

      let groupLinkItem = document.createElement('a');
      groupLinkItem.classList.add('group-link-item');
      groupLinkItem.href = item.url;
      groupLinkItem.setAttribute('target','_blank')
      let groupItemPhoto = document.createElement('img');
      groupItemPhoto.classList.add('group-item-photo');
      groupItemPhoto.src = item.photoUrl;
      groupLinkItem.appendChild(groupItemPhoto);
      let groupItemText = document.createElement('p');
      groupItemText.textContent = item.previewText;
      groupItemText.classList.add('group-item-text');
      groupLinkItem.appendChild(groupItemText);
      groupList.appendChild(groupLinkItem);
    };
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
