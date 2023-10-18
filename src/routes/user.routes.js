import { Router } from 'express';
// import usuario from '../dao/mongo/models/Users.js';
import { isValidatePassword } from '../../utils.js';
import productos from '../dao/mongo/models/Product.js';
import cartModel from '../dao/mongo/models/Carrito.js';
import bcrypt from 'bcrypt'
import  { Users } from '../dao/factory.js';

const router = Router();
const userServices = new Users();


router.get("/login", async (req, res) => {
    res.render ("login")
})

router.get("/register", async (req, res) => {
    res.render("register")
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).render("login", { error: "Valores erroneos" });
   console.log (userServices)
   
    const user = await userServices.findOne({ email }, { first_name: 1, last_name: 1, age: 1, password: 1, email: 1 , isAdmin: 1 });
    
        let products= await productos.find()
        req.session.products = products
        console.log (products)

    if (!user) {
        return res.status(400).render("login", { error: "Usuario no encontrado" });
    }

    if (!isValidatePassword(user, password)) {
        return res.status(401).render("login", { error: "Error en password" });
    }
    console.log (user)

    req.session.user = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        isAdmin: user.isAdmin
    };
    

    if (user.isAdmin == false) {
        res.redirect("/api/sessions/producto");
    } else {
        res.redirect("/api/sessions/admin");
        
    }
    
})


router.get("/producto", async (req, res) => {
    if (!req.session.user ) {
        return res.redirect("login")
    }

    const { first_name, last_name, email, age, isAdmin} = req.session.user
    try {
       
        const products= await productos.find();
        const productsWithOwnProperties = products.map(producto => {
            return {
                nombre: producto.nombre,
                precio: producto.precio,
                _id: producto._id
            };
        });
        
        res.render("producto", { first_name, last_name, age, email, isAdmin, products: productsWithOwnProperties });
        
    } catch (error) {
        console.error("Error al obtener productos:", error);
        
    }
})

router.get("/admin", async (req, res) => {
    if (!req.session.products) {
        return res.redirect("login")
    }

    const { first_name, last_name, email, age, isAdmin} = req.session.user
    try {
       
        const products= await productos.find();
        const productsWithOwnProperties = products.map(producto => {
            return {
                nombre: producto.nombre,
                precio: producto.precio,
                stock: producto.stock
            };
        });
        
        res.render("admin", { first_name, last_name, age, email, isAdmin, products: productsWithOwnProperties });
        
    } catch (error) {
        console.error("Error al obtener productos:", error);
        
    }
    
})

router.get("/logout", async (req, res) => {
    delete req.session.user
    res.redirect("/api/sessions/login")
})

router.post('/register', async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  
  const hashedPassword = await bcrypt.hash(password, 10);
    const user = await usuario.create({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword
  });

    console.log('Usuario registrado con éxito.' + user);
    res.redirect('/api/sessions/login');
});


router.get("/failregister", async (req, res) => {
    console.log("Falla en autenticacion")
    res.send({ error: "Falla" })
})


router.get("/faillogin", async (req, res) => {
    console.log("Falla en autenticacion")
    res.send({ error: "Falla" })
})

router.post ('/agregar', async(req, res) => {
    try {
        let {nombre, categoria, precio, stock, imagen} = req.body
        if (!nombre || !categoria || !precio || !stock || !imagen ) {
            res.send({status: "error", error: "Faltan datos"})
        }
       
        let result = await productos.create({nombre, categoria, precio, stock, imagen, })
        
        console.log ("producto agregado" + result)
        res.redirect('/api/sessions/admin')
    } catch (error) {
        console.log(error)
    }
})

router.post('/agregarCarrito', async (req, res) => {
    try {
    
        
        const {pid} = req.body    
        console.log (pid)
        const producto = await productos.findById(pid)

        console.log (producto)
       

        if (!producto) {
            res.send({ status: "error", error: "Producto no encontrado" })
            return
        }

        const carritoItem = {
            products: [{
            nombre: producto.nombre,
            categoria: producto.categoria,
            precio: producto.precio,
            cantidad: 1,
            imagen: producto.imagen
            }]
            
        };

    
        const result = await cartModel.create(carritoItem)

        console.log ("producto agregado" + result)
        res.redirect('/api/sessions/producto')
    } catch (error) {
        console.log(error)
    }
})



export default router