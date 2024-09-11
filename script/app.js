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
    // Lista ID-ova kartica (20 kartica)
    const cardIds = Array.from({ length: 21 }, (_, i) => `card${i + 1}`);

    async function fetchDataAndDisplay() {
        try {
            // Poziv API-ja koji vraća listu organizacija
            const response = await fetch('https://66cdb8778ca9aa6c8ccb5d3e.mockapi.io/api/charitysearch/charities');

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
                    <div class="card-body" style="display: flex; flex-direction: column; justify-content: space-between; align-items: center; height: 100%; text-align: center;">
                        <img class="card-img-top" src="${org.image_url}" alt="${org.organization_name}" style="height: 150px; width: 100%; object-fit: cover; border-radius: 5px;">
                        <h5 style="font-size: 1.2rem; margin: 10px 0;">${org.organization_name}</h5>
                        <p style="font-size: 0.9rem; flex-grow: 1;">${org.description}</p>
                        <div style="width: 100%;">
                            <a href="../pages/thankyou.html">
                                <button type="button" style="background-color: #14213d; color: white; width: 100%;" class="btn">Donate</button>
                            </a>
                        </div>
                    </div>
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
