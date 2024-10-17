'use strict';

const optionList = document.querySelector('[data-list]');
const option = document.querySelectorAll('.tree__type-item');

const selectDiametr = document.querySelector('[data-list-diametr]');
const weightM3 = document.querySelector('[data-weight-m3]');
const crownBox = document.querySelector('[data-crown]');
const trunkBox = document.querySelector('[data-trunk]');
const totalBox = document.querySelector('[data-total]');

const totalKilogram = document.querySelector('[data-kg]');
const totalTonn = document.querySelector('[data-tonn]');

const dataError = document.querySelector('[data-error]');

const clearBtn = document.querySelector('[data-clear]');

let selectedTreeWeight;
let selectedTreeCub;

fetch('tree.json')
.then(response => response.json())
.then(data => {
  const treeData = data["tree-data"];

  optionList.addEventListener('change', function() {
    const selectedText = optionList.options[optionList.selectedIndex].text;
    let selectedTree = treeData.find(item => item.name === selectedText);
    if (selectedTree) {
      selectedTreeWeight = selectedTree.weight;
      weightM3.textContent = selectedTree.weight;
      populateDiameterOptions(selectedTree.diametr);
    }
  });

  function populateDiameterOptions(diameters) {
    Object.keys(diameters).sort((a, b) => Number(a) - Number(b)).forEach(diameter => {
      const option = document.createElement('option');
      option.value = diameter;
      option.textContent = diameter;
      selectDiametr.appendChild(option);
    });
  }

  selectDiametr.addEventListener('change', function() {
    const selectedTreeName = optionList.options[optionList.selectedIndex].text;
    const selectedTree = treeData.find(item => item.name === selectedTreeName);
    const selectedDiam = selectDiametr.value;
 

    if (selectedTree && selectedDiam) {
      const diametrKey = String(selectedDiam);
      const diametrData = selectedTree.diametr[diametrKey];
      if (diametrData) {
        totalBox.textContent = diametrData.total.toFixed(2);
        trunkBox.textContent = diametrData.trunk.toFixed(2);
        crownBox.textContent = diametrData.crown.toFixed(2);

        const weightKg = diametrData.total * selectedTree.weight;
        totalKilogram.textContent = weightKg.toFixed(2);
        totalTonn.textContent = (weightKg / 1000).toFixed(3);

        dataError.textContent = ''
      } else {
        clearResults()
      }

    } else {
      clearResults()
    }

  });

  function clearResults() {
    totalBox.textContent = '';
    trunkBox.textContent = '';
    crownBox.textContent = '';
    totalTonn.textContent = '';
    totalKilogram.textContent = '';
    weightM3.textContent = '';
    dataError.textContent = 'Данные не найдены';
  }

  function populateDiameterOptions(diameters) {
    selectDiametr.innerHTML = '<option value=""> </option>';
    Object.keys(diameters)
      .sort((a, b) => Number(a) - Number(b))
      .forEach(diameter => {
        const option = document.createElement('option');
        option.value = diameter;
        option.textContent = diameter;
        selectDiametr.appendChild(option);
      });
  };

  function clearData() {
    totalBox.textContent = '';
    trunkBox.textContent = '';
    crownBox.textContent = '';
    totalTonn.textContent = '';
    totalKilogram.textContent = '';
    dataError.textContent = '';
    weightM3.textContent = '';
    selectDiametr.value = 0;
    optionList.value = 0;
  };

  clearBtn.addEventListener('click', function(e) {
    clearData();
  });
})
.catch(error => console.error('Ошибка:', error));



  