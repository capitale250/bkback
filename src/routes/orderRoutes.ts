import { Router } from 'express';
import { createOrder, getOrders, updateOrderStatus,getOrdersCount } from '../controllers/orderController';
import usersControlers from '../controllers/usersControlers';
const router = Router();

router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.get('/orders/count', getOrdersCount);
router.patch('/orders/status', updateOrderStatus);
router.post('/authanticate',usersControlers.userRegistration)
router.post('/login',usersControlers.login)
export default router;