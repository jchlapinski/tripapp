const express = require('express')
const router = express.Router()

const CommentController = require('../controllers/CommentController')
const PhotoController = require('../controllers/PhotoController')
const PlaceController = require('../controllers/PlaceController')
const UserController = require('../controllers/UserController')

router.post('/api/users/register', UserController.registerUser)
router.get('/api/users/confirm/:linkId', UserController.confirmUser)

router.get('/api/places', PlaceController.getAllPlaces)
router.get('/api/places/:id',PlaceController.getPlaceByID, PlaceController.getPlaceDetailsById)
router.post('/api/places', PlaceController.createPlace)
router.put('/api/places/:id',PlaceController.getPlaceByID, PlaceController.updatePlace)

router.get('/api/photos/:id',PlaceController.getPlaceByID, PhotoController.getPhotosForPlace)
router.post('/api/photos/:id',PlaceController.getPlaceByID, PhotoController.addPhotoForPlace)
router.delete('/api/photos/:id', PhotoController.removePhotoById)

router.get('/api/comments/:id',PlaceController.getPlaceByID, CommentController.getCommentsForPlace)
router.post('/api/comments/:id',PlaceController.getPlaceByID, CommentController.createCommentForPlace)
router.delete('/api/comments/:id', CommentController.markCommentNotProper)

router.get('/home', (req, resp, next) => {
    resp.end("<body>To jest strona domowa.</body>", (err) => {
        if (err) {
            throw err
        } else {
            next()
        }
    })
})

module.exports = router