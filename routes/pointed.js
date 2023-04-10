const router = require('express').Router();
const Pointed = require ('../models/Pointed');
const { isAuthenticated, isAdmin } = require('../middlewares/jwt');

// @desc    All user's Pointeds 
// @route   GET /pointed
// @access  Private
router.get('/', isAuthenticated, async (req, res, next) => {
    const user = req.body;
    const { pointedId } = req.params;
    try {
        const MyPointed = await Pointed.find({ userId: user._id, pointed: pointedId }).populate('bulletin');
            res.status(200).json(MyPointed);
    } catch (error) {
        next(error);
    }
});

// @ desc Point to bulletin
// @ route POST /pointed
// @ access Private
router.post('/:bulletinId', isAuthenticated, async (req, res, next) => {
    const user = req.body;
    const { bulletinId } = req.params;
    try {
        const isPointed = await Pointed.findOne({ user: user._id, bulletin: bulletinId });
            if (isPointed) {
                res.status(204).json({message: 'Pointed!'})
            } else {
                await Pointed.create({ user: user._id, bulletin: bulletinId });
                res.status(200).json({message: 'Pointed!'})
            }
        } catch (error) {
            next(error)
    }
});

// @desc Users delete their pointed
// @route GET pointed/delete/bulletinId
// @access Private
router.delete('/:bulletinId', isAuthenticated, async (req, res, next) => {
    const user = req.body;
    const { pointedId } = req.params;
    try {
        await Pointed.findOneAndDelete({ user: user._id, pointed: pointedId });
        res.status(200).json({message: 'delete'});
        } catch (error) {
        next(error)
        }
    });

module.exports = router;