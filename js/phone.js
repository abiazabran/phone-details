const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  console.log(phones);
  phoneCarde(phones, isShowAll);
};

function phoneCarde(phones, isShowAll) {
  console.log(isShowAll);
  const phoneDiv = document.querySelector('.phone-div');
  phoneDiv.textContent = '';
  const showAllBtn = document.querySelector('#show-all-container');
  if (phones.length > 12 && !isShowAll) {
    showAllBtn.classList.remove('hidden');
  } else {
    showAllBtn.classList.add('hidden');
  }
  // console.log('is show al ', isShowAll);
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    console.log(phone);
    const ele = document.createElement('div');
    ele.innerHTML = `
    <div class="card w-96 bg-white shadow-xl">
        <figure><img class="pt-5" src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
                    <h2 class="card-title">brand:${phone.brand}</h2>
                    <h2>${phone.phone_name}</h2>
                    <p>${phone.slug}</p>
                    <div class="card-actions justify-start mt-5">
                <button onclick="popPup('${phone.slug}')" id="drawer" class="btn btn-primary">Show Details</button>
            </div>
        </div>
    </div>
`;
    phoneDiv.appendChild(ele);
  });
  toggolLoadingBars(false);
}

const popPup = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  console.log(data);
  const phoneData = data.data;
  showModal(phoneData);
};
function showModal(phoneData) {
  const showPhoneDetail = document.querySelector('.phone-detail-container');
  showPhoneDetail.innerHTML = `
  <div class="-ml-[350px]">
    <h1>Name : ${phoneData.name}</h1>
    <figure><img class="pt-5" src="${phoneData.image}" alt="Shoes" /></figure>
    <h1>storage : ${phoneData?.mainFeatures?.storage}</h1>
    <h1>displaySize : ${phoneData?.mainFeatures?.displaySize}</h1>
    <h1>Chipset : ${phoneData?.mainFeatures?.chipSet}</h1>
    
  </div>
  
  `;

  console.log(phoneData);
  my_modal.showModal();
}

function handelScarch(isShowAll) {
  toggolLoadingBars(true);
  const scarchBox = document.querySelector('.scarch-box');
  const scarchText = scarchBox.value;
  console.log('scarch', scarchText);
  loadPhone(scarchText, isShowAll);
}

function toggolLoadingBars(isloding) {
  const loadingBars = document.querySelector('.toggols');
  if (isloding) {
    loadingBars.classList.remove('hidden');
  } else {
    loadingBars.classList.add('hidden');
  }
}

function handelShowAll() {
  handelScarch(true);
}

loadPhone('a');
