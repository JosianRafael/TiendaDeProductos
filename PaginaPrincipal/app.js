const products = [
  {
    id: 1,
    image: "https://i.pinimg.com/originals/59/94/f0/5994f03cb548490b2cfd6fe446e56ea4.jpg",
    precio: "$24.990",
    name: "Producto 1",
    description: "Suéter hecho a mano, tejido con la mejor tela, resistente y duradero."
  },
  {
    id: 2,
    image: "https://m.media-amazon.com/images/I/615hcGcvgAL._AC_UL480_FMwebp_QL65_.jpg",
    precio: "$30.999",
    name: "Producto 2",
    description: "Camisa color azul celeste con un tono de verde, de cuello, ideal para el verano."
  },
  {
    id: 3,
    image: "https://m.media-amazon.com/images/I/51KFBNYFISL._AC_UL480_FMwebp_QL65_.jpg",
    precio: "$50.992",
    name: "Producto 3",
    description: "Suéter de color blanco, cómodo y a buen precio."
  },
  {
    id: 4,
    image: "https://m.media-amazon.com/images/I/61Tz2UUUdSS._AC_UL1500_.jpg",
    precio: "$150.99",
    name: "Producto 4",
    description: "Suéter con mangas rojas, adecuado para días soleados o fríos, y también para el gimnasio."
  },
  {
    id: 5,
    image: "https://m.media-amazon.com/images/I/81LxXYUmxPL._AC_UX679_.jpg",
    precio: "$150.99",
    name: "Producto 5",
    description: "Abrigo de color negro, a buen precio y de buena calidad, con tela 100%."
  },
  {
    id: 6,
    image: "https://images-na.ssl-images-amazon.com/images/I/51cx-7AgscL._AC_UX679_.jpg",
    precio: "$150.99",
    name: "Producto 6",
    description: "Suéter de mangas largas, cómodo para el verano, en oferta."
  },
  {
    id: 7,
    image: "https://images-na.ssl-images-amazon.com/images/I/61KqsGQcZKL._AC_UX679_.jpg",
    precio: "$150.99",
    name: "Producto 7",
    description: "Suéter típico de tela suave, color negro, para disfrutar del verano."
  },
  {
    id: 8,
    image: "https://www.elpalaciodehierro.com/on/demandware.static/-/Sites-palacio-master-catalog/default/dwd20a3013/images/40333646/gris/large/40333647_GRIS_x1.jpg",
    precio: "$150.99",
    name: "Producto 8",
    description: "Suéter para niños, ideal para todo el verano, con buena tela resistente."
  },
  {
    id: 9,
    image: "https://i.pinimg.com/originals/a0/73/8e/a0738e79a2cdf6db2e46a8a13fed45de.jpg",
    precio: "$150.99",
    name: "Producto 9",
    description: "Suéter tipo abrigo con una tela suavemente cómoda."
  },
  {
    id: 10,
    image: "https://m.media-amazon.com/images/I/31FbdO+vfrL._SL500_.jpg",
    precio: "$150.99",
    name: "Producto 10",
    description: "Combo de verano en oferta: llévate tu suéter junto con tu pantalón."
  },
  

]





let carrito = []

const carritoAlmacenado = localStorage.getItem('carrito_db');
if(carritoAlmacenado) {
  carrito = JSON.parse(carritoAlmacenado)
  contador.textContent = carrito.length 
}


const productCard = (product) => {


  
  let estadoArticulo = 'No agregado'
  let claseEstadoArticulo = ''
  let texto_boton = 'Add to cart'

  const existeEnCarrito = carrito.find(productoEnCarrito => productoEnCarrito.id == product.id)
  if(existeEnCarrito) {
    estadoArticulo = 'Agregado'
    claseEstadoArticulo ='text-verde'
    texto_boton = 'delete'
  }


  

  return `
  <div class="bg-background rounded-lg shadow-lg overflow-hidden">
      <a class="block" href="#" rel="ugc">
        <img id="imagen"
          src="${product.image}"
          alt="Product 3"
          width="500"
          height="400"
          class="w-full h-64 object-cover"
          style="aspect-ratio: 500 / 400; object-fit: cover;"
        />
      </a>
      <div class="p-4">
        <h3 id="titulo" class="text-lg font-medium text-primary-foreground">${product.name}</h3>
        <p id="descripcion" class="text-sm text-muted-foreground">${product.description}</p>
        <div class="flex items-center justify-between mt-4">
          <span id="price" class="text-xl font-bold text-primary-foreground">${product.precio}</span>
          <span id="check" class="${claseEstadoArticulo}">${estadoArticulo}</span>
          <button data-id="${product.id}" data-klk="saludo" id="add-to-card" class="add-cart inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
            <span id="contenido-boton">${texto_boton}</span>
          </button>
        </div>
      </div>
    </div>

`
}




// Navbar Toggle
document.addEventListener('DOMContentLoaded', function () {

  // elemento section
    const $productsContainer = document.getElementById('products');

    const enCarrito = document.getElementsByClassName('contenedor-carrito')

    console.log('enCarrito',enCarrito)
    
    let productos_a_mostrar = products
    if(enCarrito.length) {
      productos_a_mostrar =  carrito
    }

    // rellenamos el elemento section con cards (una card por cada producto en el array de productos)
    for(let product of productos_a_mostrar) {
      $productsContainer.innerHTML += productCard(product);
    }

    // Algoritmo para el contador. 

    const contador = document.getElementById('contador');
    // Selecciona todos los botones cuyo ID contenga "add-to-cart"
    const botones = document.querySelectorAll('[id^="add-to-card"]');
  

    const buttons = document.querySelectorAll('#add-to-card');
    const checkSpans = document.querySelectorAll('#check');
    
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {

          // leemos la propiedad data-id, que tiene el valor del id del producto
          const productId = button?.dataset?.id
          

          // buscamos el producto por el valor del id que estaba en data-id=""
          const product = products.filter(p => p.id == productId)[0]

          
          
          console.log('producto a agregar o eliminar', product)
          console.log('carrito actual', carrito)

            const btnText = checkSpans[index].textContent
            if(btnText == 'Agregado') {
              checkSpans[index].textContent = 'No agregado';
              texto_boton[index].textContent = 'Add to cart';

              // eliminar producto del carrito
              carrito = carrito.filter(p => p.id !== product.id)
              alert("El producto a sido eliminado del carrito");
            
            } else {
              checkSpans[index].textContent = 'Agregado';
              texto_boton[index].textContent = 'delete';
              
              // agregar producto
              carrito.push(product)
              alert("El articulo ha sido agregado exitosamente al carrito.")
  
            }
            checkSpans[index].classList.toggle('text-verde');
            
            contador.textContent = carrito.length 

            const carritoString = JSON.stringify(carrito);
            localStorage.setItem('carrito_db',  carritoString)
        });
    });

const contenido_boton = document.querySelectorAll('#add-to-card');
const texto_boton = document.querySelectorAll('#contenido-boton');


    // Get all "navbar-burger" elements
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
    
      // Add a click event on each of them
      $navbarBurgers.forEach(function ($el) {
        $el.addEventListener('click', function () {
    
          // Get the "main-nav" element
          var $target = document.getElementById('main-nav');
    
          // Toggle the class on "main-nav"
          $target.classList.toggle('hidden');
    
        });
      });
    }
    
    });






     

      

    

    


