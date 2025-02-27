document.getElementById("publicar-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append("nombre", document.getElementById("nombre").value);
    formData.append("descripcion", document.getElementById("descripcion").value);
    formData.append("precio", document.getElementById("precio").value);
    formData.append("categoria", document.getElementById("categoria").value);
    formData.append("imagen", document.getElementById("imagen").files[0]);

    fetch("publicar_herramienta.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.status === "success") {
            document.getElementById("publicar-form").reset();
            cargarHerramientas(); // Recargar la lista
        }
    })
    .catch(error => console.error("Error al publicar herramienta:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    cargarHerramientas();
});

async function cargarHerramientas() {
    try {
        const response = await fetch("get_herramientas.php");
        const text = await response.text(); // Captura el texto bruto antes de convertir a JSON
        console.log("Respuesta de get_herramientas.php:", text);

        const herramientas = JSON.parse(text);
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
    const minPrice = parseFloat(document.getElementById("min-price").value) || 0;
    const maxPrice = parseFloat(document.getElementById("max-price").value) || Infinity;

    fetch("get_herramientas.php")
        .then(response => response.json())
        .then(herramientas => {
            let herramientasFiltradas = herramientas.filter(herr => 
                herr.nombre.toLowerCase().includes(searchText) &&
                (selectedCategory === "" || herr.categoria === selectedCategory) &&
                herr.precio >= minPrice && herr.precio <= maxPrice
            );
            mostrarHerramientas(herramientasFiltradas);
        })
        .catch(error => console.error("Error al filtrar herramientas:", error));
}

