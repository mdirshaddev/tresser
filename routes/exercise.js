const router = require('express').Router();
let Exercise = require('../model/exercise.model');
const { route } = require('./user');
//get method
router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercies => res.json(exercies))
        .catch(err => res.status(400).json('Error '+err));
});
//post method
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    newExercise.save()
        .then(()=>res.json('Exerise Added'))
        .catch(err=>res.status(400).json('Error '+err));
})
//get detailed method
router.route('/:id').get((req, res)=>{
    Exercise.findById(req.params.id)
        .then((exercise)=> res.json(exercise))
        .catch(err=>res.status(400).json('Error '+err));
});
//delete by id method
router.route('/:id').delete((req, res)=>{
    Exercise.findByIdAndDelete(req.params.id)
        .then(()=> res.json('Exercise deleted.'))
        .catch(err=> res.status(400).json('Error '+err));
})
//put method
router.route('/update/:id').post((req, res)=>{
    Exercise.findById(req.params.id)
        .then((exercise)=>{
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(()=> res.json('Exercise is Updated.'))
                .catch((err)=> res.status(400).json('Error '+err));
        })
        .catch(err=>res.json('Error '+err));
});

module.exports = router;