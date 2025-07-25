document.addEventListener('DOMContentLoaded', () => {
  const filters = document.querySelectorAll('.filter-buttons button');
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.getElementById('lightbox');
  const imgBox = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let currentList = items;
  let index = 0;

  // Filtering
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.filter;
    currentList = cat === 'all' ? items : items.filter(i => i.dataset.category === cat);
    items.forEach(i => i.style.display = (cat === 'all' || i.dataset.category === cat) ? 'block' : 'none');
  }));

  // Open Lightbox
  items.forEach((itm, i) => {
    itm.addEventListener('click', () => {
      currentList = currentList.length ? currentList : items;
      index = currentList.indexOf(itm);
      openLB(itm.querySelector('img'));
    });
  });

  function openLB(img) {
    imgBox.src = img.src;
    imgBox.alt = img.alt;
    lightbox.style.display = 'flex';
    imgBox.classList.add('fade-in');
  }

  closeBtn.onclick = () => lightbox.style.display = 'none';
  prevBtn.onclick = () => navigate(-1);
  nextBtn.onclick = () => navigate(1);
  lightbox.onclick = e => { if (e.target === lightbox) lightbox.style.display = 'none'; };

  function navigate(offset) {
    index = (index + offset + currentList.length) % currentList.length;
    const img = currentList[index].querySelector('img');
    imgBox.src = img.src;
    imgBox.alt = img.alt;
    imgBox.classList.add('fade-in');
  }
});
