// src/controllers/orderController.ts
import { Request, Response } from 'express';
import { Farmer } from '../models/Farmer';
import { Order } from '../models/Order';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { farmerId, fertilizer, seed } = req.body;
    const farmer = await Farmer.findById(farmerId);

    if (!farmer) {
      return res.status(404).send('Farmer not found');
    }

    const fertilizerQty = Math.min(farmer.landSize * 3, 3); // max 3kg per acre
    const seedQty = farmer.landSize; // max 1kg per acre

    const order = new Order({
      farmer: farmerId,
      fertilizer,
      fertilizerQty,
      seed,
      seedQty
    });

    await order.save();
    farmer.orders.push(order._id);
    await farmer.save();

    res.status(201).send(order);
  } catch (error:any) {
    console.log(error.message)
    res.status(500).send(error.message);
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const pageSize=Number(req.query.pageSize)
    const page=Number(req.query.page)
    const orders = await Order.find().populate('farmer').sort({ seed: 1 }).skip(pageSize*(page-1)).limit(pageSize);
    res.status(200).send(orders);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};
export const getOrdersCount = async (req: Request, res: Response) => {
    try {
      const orders = await Order.countDocuments();
      res.status(200).json(orders);
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  };

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;
    console.log(orderId)

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).send('Order not found');
    }

    order.status = status;
    await order.save();

    res.status(200).send(order);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};