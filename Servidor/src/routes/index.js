const { Router } = require('express');
const router = Router();
const { requireAuthA, requireAuthM } = require('../utils/auth')

const usersRoute = require('./userRoutes');
const loginRoute = require('./loginRoute');
const roleRoute = require('./roleRoute');
const empresaRoute = require('./empresaRoute');
const bodegaRoute = require('./bodegaRoute')
const userInfoRoute = require('./userInfoRoute')
const facturacionDataRoute = require('./facturacionRoute')


router.use("/api/users", usersRoute);
router.use("/api/users/role", /*requireAuthA,*/ roleRoute);
router.use("/api/login", loginRoute);
router.use("/api/bodega", /*requireAuthA,*/ bodegaRoute);
router.use("/api/empresa", /*requireAuthA,*/ empresaRoute);
router.use("/api/userinfo", /*requireAuthM,*/ userInfoRoute);
router.use("/api/facturation", facturacionDataRoute);
module.exports = router;
