document.addEventListener("DOMContentLoaded", () => {
    cargarHerramientas();
});

async function cargarHerramientas() {
    try {
        const response = await fetch("get_herramientas.php");
        const herramientas = await response.json();
        mostrarHerramientas(herramientas);
    } catch (error) {
        console.error("Error al cargar las herramientas:", error);
    }
}

function mostrarHerramientas(herramientas) {
    const listado = document.getElementById("herramientas-listado");
    listado.innerHTML = ""; // Limpiar antes de cargar

    herramientas.forEach(herramienta => {
        const item = document.createElement("li");
        item.classList.add("herramienta");
        item.innerHTML = `
            <h3>${herramienta.nombre}</h3>
            <p>${herramienta.descripcion}</p>
            <p><strong>Precio:</strong> $${herramienta.precio}/día</p>
            <img src="${herramienta.imagen}" alt="${herramienta.nombre}" style="max-width:100px;">
            <button>Contactar</button>
        `;
        listado.appendChild(item);
    });
}

function filtrarHerramientas() {
    const searchText = document.getElementById("search").value.toLowerCase();
    const selectedCategory = document.getElementById("filter-category").value;

    fetch("get_herramientas.php")
        .then(response => response.json())
        .then(herramientas => {
            let herramientasFiltradas = herramientas.filter(herr => 
                herr.nombre.toLowerCase().includes(searchText) &&
                (selectedCategory === "" || herr.categoria === selectedCategory)
            );
            mostrarHerramientas(herramientasFiltradas);
        })
        .catch(error => console.error("Error al filtrar herramientas:", error));
}
