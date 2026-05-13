document.addEventListener("DOMContentLoaded", () => {
  console.log("JS działa!");

  const toggleBtn = document.getElementById('toggle-theme');
  const darkTheme = document.getElementById('dark-theme');

  if (toggleBtn && darkTheme) {
    toggleBtn.addEventListener('click', () => {
      const darkModeEnabled = darkTheme.disabled;
      darkTheme.disabled = !darkModeEnabled;
      toggleBtn.textContent = darkModeEnabled ? '☀️ Tryb jasny' : '🌙 Tryb ciemny';
      localStorage.setItem('theme', darkModeEnabled ? 'dark' : 'light');
    });

    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      darkTheme.disabled = false;
      toggleBtn.textContent = '☀️ Tryb jasny';
    } else {
      darkTheme.disabled = true;
      toggleBtn.textContent = '🌙 Tryb ciemny';
    }
  }

  const navLinks = document.querySelectorAll(".main-nav a");
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  const orderButtons = document.querySelectorAll(".dish button");
  const popup = document.getElementById("order-popup");

  if (orderButtons.length > 0 && popup) {
    orderButtons.forEach(button => {
      button.addEventListener("click", () => {
        popup.classList.remove("hidden");
        setTimeout(() => {
          popup.classList.add("hidden");
        }, 3000);
      });
    });
  }

  if (currentPage === 'zamówienia.html') {
    const form = document.querySelector('.order-form');
    if (form && popup) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        popup.classList.remove('hidden');
        setTimeout(() => {
          window.location.href = 'potwierdzenie.html';
        }, 2000);
      });
    }
  }

  const cuisineSelect = document.getElementById('cuisine');
  const sortSelect = document.getElementById('sort');
  const cards = Array.from(document.querySelectorAll('.restaurant-card'));
  const list = document.getElementById('restaurant-list');

  if (cuisineSelect && sortSelect && list) {
    function render() {
      const selectedCuisine = cuisineSelect.value;
      const sortBy = sortSelect.value;

      let filtered = cards.filter(card => {
        return selectedCuisine === 'all' || card.dataset.cuisine === selectedCuisine;
      });

      filtered.sort((a, b) => {
        const aVal = Number(a.dataset[sortBy]);
        const bVal = Number(b.dataset[sortBy]);
        return aVal - bVal;
      });

      list.innerHTML = '';
      filtered.forEach(card => list.appendChild(card));
    }

    cuisineSelect.addEventListener('change', render);
    sortSelect.addEventListener('change', render);
    render();
  }

  const categoryFilter = document.getElementById("category-filter");
  const allCategories = document.querySelectorAll("section.category");

  if (categoryFilter && allCategories.length > 0) {
    function filterCategories() {
      const selected = categoryFilter.value;

      allCategories.forEach(section => {
        section.style.display = (selected === "all" || section.id === selected) ? "block" : "none";
      });

      if (typeof AOS !== "undefined") {
        AOS.refresh();
      }
    }

    categoryFilter.addEventListener("change", filterCategories);
    filterCategories();
  }

  const elements = document.querySelectorAll('.scroll-reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));

  const dishes = document.querySelectorAll(".dish[data-aos]");
  dishes.forEach((dish, index) => {
    dish.setAttribute("data-aos-delay", index * 100);
  });
});
