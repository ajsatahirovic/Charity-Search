window.onscroll = function () {
    myFunction();
};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
    if (window.scrollY >= sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}

function toggleMenu() {
    var links = document.querySelector(".nav, .links");
    links.classList.toggle("responsive");
}
//   api cards
document.addEventListener("DOMContentLoaded", function () {
    const cardIds = ["card1", "card2", "card3", "card4"];

    async function fetchDataAndDisplay() {
        try {
            // Poziv API-ja koji vraća listu organizacija
            const response = await fetch('https://66cdb8778ca9aa6c8ccb5d3e.mockapi.io/api/charitysearch/organizations');

            // Proveravamo da li je odgovor uspešan
            if (!response.ok) {
                throw new Error(`Greška sa API-jem, status: ${response.status}`);
            }

            // Parsiranje JSON podataka
            const data = await response.json();

            // Iteriramo kroz kartice i popunjavamo ih podacima
            cardIds.forEach((cardId, index) => {
                const cardElement = document.getElementById(cardId);

                // Provera da li imamo dovoljno podataka za kartice
                if (index < data.length) {
                    const org = data[index]; // Uzimamo organizaciju sa indeksom

                    // HTML sadržaj kartice
                    cardElement.innerHTML = `
                        <img src="${org.image_url}" alt="${org.organization_name}" style="width:100%; height:auto;">
                        <h3>${org.organization_name}</h3>
                        <p>${org.description}</p>
                    `;
                } else {
                    cardElement.innerHTML = `<p class="error-text">Nema više organizacija za prikaz.</p>`;
                }
            });
        } catch (error) {
            console.error("Došlo je do greške:", error);
            // Prikaz greške za svaku karticu
            cardIds.forEach(cardId => {
                const cardElement = document.getElementById(cardId);
                cardElement.innerHTML = `<p class="error-text">Greška prilikom učitavanja podataka: ${error.message}</p>`;
            });
        }
    }

    // Poziv funkcije za prikaz podataka
    fetchDataAndDisplay();
});
