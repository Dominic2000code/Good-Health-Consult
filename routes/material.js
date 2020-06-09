const router = require('express').Router();
const { Material } = require('../models/Material');
router.get('/', (req, res) => {
    res.send(' Use postman to test the API')
})


router.post('/add', (req, res) => {
    const materialData = {
        materialCode: req.body.materialCode,
        materialName: req.body.materialName,
        materialUnitPrice: req.body.materialUnitPrice,
        materialStockLevel: req.body.materialStockLevel
    }
    console.log(materialData).
        Material.findOne({ materialCode: materialData.materialCode }).then(result => {
            if (result) {
                return res.json({ message: `  ${materialCode} ` })
            }
            Material.create(materialData).then(newRecord => {
                return res.json(newRecord);
            })
                .catch(error => {
                    return res.json({
                        message: ` ${error.message}`
                    })
                });
        })
        .catch(error => {
            return res.json({
                message: `${error.message}`
            })
        })

});

router.put('/update/:materialCode', (req, res) => {
    res.send('Update later')
});

router.delete('/delete/:materialCode', (req, res) => {
    res.send('Delete Later')
});

module.exports = router;