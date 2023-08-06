import _ from 'lodash'

document.getElementById('button1').addEventListener('click', () => {
  const el = document.getElementById('header')
  el.innerHTML = 'Hey i have updated the code !'

  const listItems = ['Apple', 'orange', 'Banana']
  const ul = document.getElementById('shoppingList')
  _.forEach(listItems, (item) => {
    const tempEl = document.createElement('li')
    tempEl.innerHTML = item
    ul.appendChild(tempEl)
  })
})
