import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
import asynchandler from 'express-async-handler';
import { FoodModel } from "../models/food.model";
const router = Router();

router.get("/seed", asynchandler (
    async (req,res)=> {
        const foodsCount = await FoodModel.countDocuments();
        if (foodsCount > 0){
            res.send("Seed is already done!");
            return;
        }
        await FoodModel.create(sample_foods);
        res.send("Seed is done!")
    
}))

// router.get("/", (req,res)=> {
//     res.send(sample_foods);
// })
router.get("/",asynchandler( async (req,res)=> {
    const foods = await FoodModel.find();
    res.send(foods);
}) )

router.get("/search/:searchTerm",asynchandler(
    async(req, res)=>{
    const searchRegex = new RegExp(req.params.searchTerm,'i');
    const foods = await FoodModel.find({name: {$regex: searchRegex}})
    res.send(foods);
}))

// router.get("/search/:searchTerm", (req, res)=>{
//     const searchTerm = req.params.searchTerm;
//     const foods = sample_foods
//     .filter(food => food.name.toLowerCase()
//     .includes(searchTerm.toLowerCase()));
//     res.send(foods);
// })
router.get("/tags", asynchandler(
    async(req, res) => {
    const tags = await FoodModel.aggregate([{
        $unwind: '$tags'
    },
    {
        $group: {
            _id:'$tags',
            count: {$sum: 1}
        }
    },
    {
        $project: {
            _id :0,
            name: '$_id',
            count: '$count'
        }
    }
    ]).sort({count : -1 });
    const all = {
        name: 'All',
        count: await FoodModel.countDocuments()
    }
    tags.unshift(all)
    res.send(tags);
}))

// router.get("/tags", (req, res) => {
//     res.send(sample_tags);
// })
router.get("/tags/:tagName",asynchandler(
    async(req,res) => {
    const foods = await FoodModel.find({tags: req.params.tagName})
    res.send(foods);
}))


// router.get("/tags/:tagName", (req,res) => {
//     const tagName = req.params.tagName;
//     const foods = sample_foods
//     .filter(food => food.tags?.includes(tagName));
//     res.send(foods);
// })

router.get("/:foodId",asynchandler( 
    async(req,res) => {
    const foodId = req.params.foodId;
    const food = await FoodModel.findById(foodId)
    res.send(food);
}))

// router.get("/:foodId", (req,res) => {
//     const foodId = req.params.foodId;
//     const food = sample_foods
//     .find(food => food.id == foodId);
//     res.send(food);
// })

export default router;