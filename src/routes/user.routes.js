import { Router } from 'express';
import { isValidatePassword } from '../../utils.js';
import productos from '../dao/mongo/models/Product.js';
import cartModel from '../dao/mongo/models/Carrito.js';
import bcrypt from 'bcrypt'
import  { Users } from '../dao/factory.js';
import { getLogin, getRegister, postLogin, getProducto, getAdmin, getLogout, postRegister, getFailRegister, getFailLogin, postAgregarCarrito, postAgregar  } from '../controllers/user.controllers.js';

const router = Router();
const userServices = new Users();

router.get("/login", getLogin);
router.get ("/register", getRegister);
router.post ("/login", postLogin);
router.get ("/producto", getProducto);
router.get ("/admin", getAdmin)
router.get ("/logout", getLogout)
router.post ("/register", postRegister)
router.get ("/failregister", getFailRegister)
router.get ("/faillogin", getFailLogin)
router.post ("/agregarCarrito", postAgregarCarrito)
router.post ("/agregar", postAgregar)



// router.post ('/agregar', async(req, res) => {
//     try {
//         let {nombre, categoria, precio, stock, imagen} = req.body
//         if (!nombre || !categoria || !precio || !stock || !imagen ) {
//             res.send({status: "error", error: "Faltan datos"})
//         }
       
//         let result = await productos.create({nombre, categoria, precio, stock, imagen, })
        
//         console.log ("producto agregado" + result)
//         res.redirect('/api/sessions/admin')
//     } catch (error) {
//         console.log(error)
//     }
// })


export default router