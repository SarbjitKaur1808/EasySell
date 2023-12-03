import Shop from '../models/shop.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './../helpers/dbErrorHandler.js'
import formidable from 'formidable'
import fs from 'fs'
//import defaultImage from './../../client/assets/images/default.png'

const create = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).json({
        message: "Image could not be uploaded"
      })
    }
    let shop = new Shop(fields)
    shop.owner = req.profile
    if (files.image) {
      shop.image.data = fs.readFileSync(files.image.path)
      shop.image.contentType = files.image.type
    }
    try {
      let result = await shop.save()
      res.status(200).json(result)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const shopByID = async (req, res, next, id) => {
  try {
    let shop = await Shop.findById(id).populate('owner', '_id name').exec()
    if (!shop)
      return res.status('400').json({
        error: "Shop not found"
      })
    req.shop = shop
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve shop"
    })
  }
}

const photo = (req, res, next) => {
  if (req.shop.image.data) {
    res.set("Content-Type", req.shop.image.contentType)
    return res.send(req.shop.image.data)
  }
  next()
}
const defaultPhoto = (req, res) => {
  //return res.sendFile(process.cwd()+defaultImage)
  return null
}

const read = (req, res) => {
  req.shop.image = undefined
  return res.json(req.shop)
}

const update = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).json({
        message: "Photo could not be uploaded"
      })
    }
    let shop = req.shop
    shop = extend(shop, fields)
    shop.updated = Date.now()
    if (files.image) {
      shop.image.data = fs.readFileSync(files.image.path)
      shop.image.contentType = files.image.type
    }
    try {
      let result = await shop.save()
      res.json(result)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

/*
const remove = async (req, res) => {
    console.log("Remove function called"); // Log at the start of the function

    try {
        let shop = req.shop
        console.log("Shop to be removed:", shop); // Log the shop object

        let deletedShop = await shop.remove();
        console.log("Shop removed successfully", deletedShop); // Log the result of the removal

        res.json(deletedShop)
    } catch (err) {
        console.error("Error occurred:", err); // Log any errors that occur\

        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
} */

const remove = async (req, res) => {
  try {
    let shopId = req.shop._id;
    //console.log("1"); //log error

    let deletedShop = await Shop.findByIdAndDelete(shopId);
    //console.log("2"); //log error

    if (!deletedShop) {
      return res.status(404).json({
        error: "Shop not found"
      });
    }
    res.json({ message: "Shop removed successfully!" });
  } catch (err) {
    console.error("Error occurred:", err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
}

const list = async (req, res) => {
  try {
    let shops = await Shop.find()
    res.json(shops)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listByOwner = async (req, res) => {
  try {
    let shops = await Shop.find({ owner: req.profile._id }).populate('owner', '_id name')
    res.json(shops)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const isOwner = (req, res, next) => {
  const isOwner = req.shop && req.auth && req.shop.owner._id == req.auth._id
  if (!isOwner) {
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

export default {
  create,
  shopByID,
  photo,
  defaultPhoto,
  list,
  listByOwner,
  read,
  update,
  isOwner,
  remove
}